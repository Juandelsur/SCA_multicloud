# =============================================================
# SCA-IT — Infraestructura Multicloud (PoC Informe 3)
# AWS: VPC + EC2 x2 + ALB + RDS PostgreSQL
# Azure: Storage Account (fotos) — gestionado separadamente
# Región: us-east-1 | AZ: us-east-1a y us-east-1b
# =============================================================

terraform {
  required_version = ">= 1.5"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# -------------------------------------------------------------
# VPC
# -------------------------------------------------------------
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name    = "${var.project_name}-vpc"
    Proyecto = var.project_name
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "${var.project_name}-igw"
  }
}

# -------------------------------------------------------------
# Subredes públicas (una por AZ — las EC2 y el ALB van aquí)
# SIN NAT Gateway (evita ~$33/mes)
# -------------------------------------------------------------
resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "${var.aws_region}a"
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-subnet-publica-a"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "${var.aws_region}b"
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-subnet-publica-b"
  }
}

# Subredes privadas (RDS va aquí — sin IP pública)
resource "aws_subnet" "private_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "${var.aws_region}a"

  tags = {
    Name = "${var.project_name}-subnet-privada-a"
  }
}

resource "aws_subnet" "private_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "${var.aws_region}b"

  tags = {
    Name = "${var.project_name}-subnet-privada-b"
  }
}

# Tabla de rutas pública
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "${var.project_name}-rt-publica"
  }
}

resource "aws_route_table_association" "public_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

# -------------------------------------------------------------
# Security Groups
# -------------------------------------------------------------

# ALB: acepta HTTP (80) y HTTPS (443) desde internet
resource "aws_security_group" "alb" {
  name        = "${var.project_name}-sg-alb"
  description = "Trafico entrante al balanceador de carga"
  vpc_id      = aws_vpc.main.id

  ingress {
    description = "HTTP publico"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "HTTPS publico"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg-alb"
  }
}

# EC2: acepta tráfico en puerto 8080 SOLO desde el ALB
# Acepta SSH SOLO desde tu IP (o usa SSM y cierra el 22)
resource "aws_security_group" "ec2" {
  name        = "${var.project_name}-sg-ec2"
  description = "Trafico a las instancias de aplicacion"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "App desde ALB"
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.alb.id]
  }

  ingress {
    description = "SSH desde tu IP"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = [var.ssh_allowed_cidr]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg-ec2"
  }
}

# RDS: acepta PostgreSQL (5432) SOLO desde las EC2
resource "aws_security_group" "rds" {
  name        = "${var.project_name}-sg-rds"
  description = "Trafico a la base de datos PostgreSQL"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL desde EC2"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.ec2.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-sg-rds"
  }
}

# -------------------------------------------------------------
# RDS PostgreSQL (PaaS gestionado — fuera de las instancias)
# -------------------------------------------------------------
resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-db-subnet-group"
  subnet_ids = [aws_subnet.private_a.id, aws_subnet.private_b.id]

  tags = {
    Name = "${var.project_name}-db-subnet-group"
  }
}

resource "aws_db_instance" "postgres" {
  identifier        = "${var.project_name}-db"
  engine            = "postgres"
  engine_version    = "16"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  storage_type      = "gp2"

  db_name  = var.db_name
  username = var.db_username
  password = var.db_password

  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]

  # Sin IP pública — solo accesible desde la VPC
  publicly_accessible = false
  multi_az            = false
  skip_final_snapshot = true

  tags = {
    Name = "${var.project_name}-postgres"
  }
}

# -------------------------------------------------------------
# EC2 — Instancia A (AZ us-east-1a)
# -------------------------------------------------------------
resource "aws_instance" "app_a" {
  ami                    = var.ec2_ami
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public_a.id
  vpc_security_group_ids = [aws_security_group.ec2.id]
  iam_instance_profile   = var.lab_instance_profile
  key_name               = var.key_pair_name

  user_data = templatefile("${path.module}/user_data.sh", {
    docker_image     = var.docker_image
    db_host          = aws_db_instance.postgres.address
    db_name          = var.db_name
    db_username      = var.db_username
    db_password      = var.db_password
    app_key          = var.app_key
    azure_storage_name      = var.azure_storage_name
    azure_storage_key       = var.azure_storage_key
    azure_storage_container = var.azure_storage_container
  })

  tags = {
    Name = "${var.project_name}-app-a"
  }

  depends_on = [aws_db_instance.postgres]
}

# -------------------------------------------------------------
# EC2 — Instancia B (AZ us-east-1b)
# -------------------------------------------------------------
resource "aws_instance" "app_b" {
  ami                    = var.ec2_ami
  instance_type          = "t3.micro"
  subnet_id              = aws_subnet.public_b.id
  vpc_security_group_ids = [aws_security_group.ec2.id]
  iam_instance_profile   = var.lab_instance_profile
  key_name               = var.key_pair_name

  user_data = templatefile("${path.module}/user_data.sh", {
    docker_image     = var.docker_image
    db_host          = aws_db_instance.postgres.address
    db_name          = var.db_name
    db_username      = var.db_username
    db_password      = var.db_password
    app_key          = var.app_key
    azure_storage_name      = var.azure_storage_name
    azure_storage_key       = var.azure_storage_key
    azure_storage_container = var.azure_storage_container
  })

  tags = {
    Name = "${var.project_name}-app-b"
  }

  depends_on = [aws_db_instance.postgres]
}

# -------------------------------------------------------------
# Application Load Balancer
# -------------------------------------------------------------
resource "aws_lb" "main" {
  name               = "${var.project_name}-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.alb.id]
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  tags = {
    Name = "${var.project_name}-alb"
  }
}

# Target Group — las EC2 como destino en puerto 8080
resource "aws_lb_target_group" "app" {
  name     = "${var.project_name}-tg"
  port     = 8080
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id

  health_check {
    enabled             = true
    path                = "/up"
    port                = "traffic-port"
    healthy_threshold   = 2
    unhealthy_threshold = 3
    timeout             = 5
    interval            = 30
    matcher             = "200"
  }

  tags = {
    Name = "${var.project_name}-tg"
  }
}

# Registrar las dos instancias en el Target Group
resource "aws_lb_target_group_attachment" "app_a" {
  target_group_arn = aws_lb_target_group.app.arn
  target_id        = aws_instance.app_a.id
  port             = 8080
}

resource "aws_lb_target_group_attachment" "app_b" {
  target_group_arn = aws_lb_target_group.app.arn
  target_id        = aws_instance.app_b.id
  port             = 8080
}

# Listener HTTP en puerto 80
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.app.arn
  }
}
