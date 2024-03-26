resource "azurerm_storage_account" "strtf" {
  name                     = var.strtf_name
  resource_group_name      = var.strtf_rg_name
  location                 = var.strtf_location
  account_tier             = var.strtf_account_tier
  account_replication_type = var.strtf_account_replication_type
}