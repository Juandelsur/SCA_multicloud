# =============================================================
# Variables — SCA-IT Infraestructura
# =============================================================

variable "project_name" {
  description = "Nombre del proyecto (prefijo para todos los recursos)"
  type        = string
  default     = "sca-it"
}

variable "aws_region" {
  description = "Región de AWS"
  type        = string
  default     = "us-east-1"
}

# AMI de Ubuntu 22.04 LTS en us-east-1 (actualizar si cambia)
variable "ec2_ami" {
  description = "AMI de Ubuntu 22.04 LTS para us-east-1"
  type        = string
  default     = "ami-0c7217cdde317cfec"
}

variable "key_pair_name" {
  description = "Nombre del Key Pair de AWS para acceso SSH a las EC2"
  type        = string
  # Crear en AWS Console > EC2 > Key Pairs antes de aplicar Terraform
}

variable "ssh_allowed_cidr" {
  description = "IP desde la que se permite SSH (tu IP pública + /32)"
  type        = string
  default     = "0.0.0.0/0" # Cambiar a tu IP real: ej. '200.10.20.30/32'
}

# Rol de instancia del AWS Academy Lab
variable "lab_instance_profile" {
  description = "Nombre del Instance Profile del LabRole (AWS Academy)"
  type        = string
  default     = "LabInstanceProfile"
}

# Base de datos
variable "db_name" {
  description = "Nombre de la base de datos PostgreSQL"
  type        = string
  default     = "sca_it"
}

variable "db_username" {
  description = "Usuario de la base de datos"
  type        = string
  default     = "sca_user"
}

variable "db_password" {
  description = "Contraseña de la base de datos (sensible)"
  type        = string
  sensitive   = true
}

# Docker
variable "docker_image" {
  description = "Imagen Docker de la aplicación (ej. ghcr.io/usuario/sca-it:latest)"
  type        = string
}

# Laravel
variable "app_key" {
  description = "APP_KEY de Laravel (base64:...)"
  type        = string
  sensitive   = true
}

# Azure Blob Storage (fotos de activos)
variable "azure_storage_name" {
  description = "Nombre de la cuenta de Azure Storage"
  type        = string
}

variable "azure_storage_key" {
  description = "Clave de acceso de Azure Storage (sensible)"
  type        = string
  sensitive   = true
}

variable "azure_storage_container" {
  description = "Nombre del container de Azure Blob"
  type        = string
  default     = "activos"
}
