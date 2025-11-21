// Configuração do Cosmos DB
export const COSMOS_DB_CONFIG = {
  endpoint: import.meta.env.VITE_COSMOS_DB_ENDPOINT || 'https://cosmosdb-funilform.documents.azure.com:443/',
  key: import.meta.env.VITE_COSMOS_DB_PRIMARY_KEY || 'Opfq0bQsmIv0Fjfa1ZAXuijANjE7JmFMgvOl8YE3eszb8f8DiPc1cOEhebQEjq7othCIiqGiFBf2ACDbVAfYCg==',
  databaseId: import.meta.env.VITE_COSMOS_DB_DATABASE || 'Users',
  containerId: import.meta.env.VITE_COSMOS_DB_CONTAINER || 'Users'
};

export default COSMOS_DB_CONFIG;
