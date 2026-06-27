# =============================================================
# Outputs — SCA-IT Infraestructura
# =============================================================

output "alb_dns" {
  description = "DNS público del Application Load Balancer (URL de la app)"
  value       = aws_lb.main.dns_name
}

output "rds_endpoint" {
  description = "Endpoint del RDS PostgreSQL (usar como DB_HOST en .env)"
  value       = aws_db_instance.postgres.address
}

output "ec2_a_ip" {
  description = "IP pública de la instancia A (us-east-1a)"
  value       = aws_instance.app_a.public_ip
}

output "ec2_b_ip" {
  description = "IP pública de la instancia B (us-east-1b)"
  value       = aws_instance.app_b.public_ip
}

output "vpc_id" {
  description = "ID de la VPC creada"
  value       = aws_vpc.main.id
}

output "instrucciones" {
  description = "Pasos post-deploy"
  value       = <<-EOT
    ============================================================
    DEPLOY COMPLETADO — SCA-IT
    ============================================================
    URL de la app:  http://${aws_lb.main.dns_name}
    RDS endpoint:   ${aws_db_instance.postgres.address}
    EC2-A (1a):     ${aws_instance.app_a.public_ip}
    EC2-B (1b):     ${aws_instance.app_b.public_ip}

    PRÓXIMOS PASOS:
    1. Esperar ~3 min a que user_data instale Docker en las EC2
    2. Verificar health checks en AWS Console > EC2 > Target Groups
    3. Abrir http://${aws_lb.main.dns_name} en el navegador
    4. Para la demo de HA: detener una instancia y recargar la URL

    RECUERDA: terraform destroy cuando termines la demo
    ============================================================
  EOT
}
