resource "azurerm_storage_container" "tf_storage_container" {
  name                  = var.tf_storage_container
  storage_account_name  = var.tf_storage_name
}