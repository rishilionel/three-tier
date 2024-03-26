data "azurerm_key_vault" "kv-three-tier" {
  name                = var.keyvault-name
  resource_group_name = var.keyvault-rg
}

data "azurerm_key_vault_secret" "Postgres_Password" {
  name      = var.kv-db
  key_vault_id = data.azurerm_key_vault.kv-three-tier.id
}

resource "azurerm_postgresql_flexible_server" "psql-three-tier" {
  name                   = var.psql-name
  resource_group_name    = var.psql-rg
  location               = var.psql-location
  version                = var.psql-version
  administrator_login    = var.psql-admin
  administrator_password = "${data.azurerm_key_vault_secret.Postgres_Password.value}"
  high_availability {
    mode                      = "ZoneRedundant"
    standby_availability_zone = 2
  }
  storage_mb             = var.psql-storage
  sku_name               = var.psql-sku
  lifecycle {
      ignore_changes = [
        zone,
        high_availability.0.standby_availability_zone
      ]
  }
}

resource "azurerm_postgresql_flexible_server_database" "book-db" {
  name      = var.psql-db-name
  server_id = azurerm_postgresql_flexible_server.psql-three-tier.id
  collation = var.psql-db-collation
  charset   = var.psql-db-charset

  # prevent the possibility of accidental data loss
  lifecycle {
    prevent_destroy = true
  }
}  