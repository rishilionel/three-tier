output "acr_user_name" {
  value = azurerm_container_registry.acr.admin_username
}

output "acr_user_password" {
  value = azurerm_container_registry.acr.admin_password
}

output "acr-url" {
  value = azurerm_container_registry.acr.login_server
}