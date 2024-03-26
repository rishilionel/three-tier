resource "azurerm_linux_web_app" "backend" {
  name                = var.app-name
  location            = var.app-location
  resource_group_name = var.rg-name
  service_plan_id = var.plan-id
  app_settings = {
    DOCKER_REGISTRY_SERVER_URL          = var.registry_url
    DOCKER_REGISTRY_SERVER_USERNAME     = var.registry_user
    DOCKER_REGISTRY_SERVER_PASSWORD     = var.registry_password
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = false
  }

  site_config {
    always_on = "true"
    application_stack {
      docker_image_name = "nginx"
    }
  }
}
