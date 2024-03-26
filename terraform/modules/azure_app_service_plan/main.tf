resource "azurerm_service_plan" "app-plan" {
  name                = var.plan-name
  resource_group_name = var.plan-rg
  location            = var.plan-location
  os_type             = var.plan-os
  sku_name            = var.plan-sku
}