resource "azurerm_resource_group" "rg-tf-storage" {
  name     = var.rg-tf-storage
  location = var.rg-tf-storage-location
}