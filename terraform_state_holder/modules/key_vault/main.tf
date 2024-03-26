data "azurerm_client_config" "current" {}

resource "azurerm_key_vault" "kv-tf" {
  name                        = var.kv-name
  location                    = var.kv-location
  resource_group_name         = var.kv-resource_group_name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 7
  purge_protection_enabled    = false

  sku_name = var.kv-sku

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get",
      "Create"
    ]

    secret_permissions = [
      "Get",
      "Set"
    ]

    storage_permissions = [
      "Get",
    ]
  }
}