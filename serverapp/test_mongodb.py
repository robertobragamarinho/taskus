#!/usr/bin/env python3
"""
Script para testar conexão com MongoDB
"""
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import sys

# Carregar variáveis de ambiente
load_dotenv()

def test_mongodb_connection():
    """Testa a conexão com MongoDB"""
    print("=" * 60)
    print("🧪 TESTE DE CONEXÃO COM MONGODB")
    print("=" * 60)
    
    # Ler configurações
    mongodb_uri = os.getenv("MONGODB_URI")
    database_name = os.getenv("MONGODB_DATABASE", "taskus_db")
    collection_name = os.getenv("MONGODB_COLLECTION", "users")
    
    print("\n📋 Configurações:")
    print(f"   Database: {database_name}")
    print(f"   Collection: {collection_name}")
    print(f"   URI configurada: {'✅ Sim' if mongodb_uri else '❌ Não'}")
    
    if not mongodb_uri:
        print("\n❌ ERRO: MONGODB_URI não encontrada no arquivo .env")
        print("   Por favor, configure a variável MONGODB_URI no arquivo .env")
        return False
    
    print(f"\n🔄 Tentando conectar ao MongoDB...")
    
    try:
        # Criar cliente MongoDB
        client = MongoClient(
            mongodb_uri, 
            serverSelectionTimeoutMS=10000,
            tlsAllowInvalidCertificates=True
        )
        
        # Testar conexão
        client.admin.command('ping')
        print("✅ Conexão estabelecida com sucesso!")
        
        # Obter informações do servidor
        server_info = client.server_info()
        print(f"\n📊 Informações do Servidor:")
        print(f"   Versão MongoDB: {server_info.get('version')}")
        print(f"   Git Version: {server_info.get('gitVersion', 'N/A')}")
        
        # Acessar database
        db = client[database_name]
        print(f"\n📁 Database: {database_name}")
        
        # Acessar collection
        collection = db[collection_name]
        print(f"📦 Collection: {collection_name}")
        
        # Contar documentos
        count = collection.count_documents({})
        print(f"📊 Total de documentos: {count}")
        
        # Listar alguns documentos
        if count > 0:
            print(f"\n📄 Primeiros documentos:")
            for doc in collection.find().limit(3):
                print(f"   - ID: {doc.get('_id', 'N/A')}")
                print(f"     Nome: {doc.get('nome', 'N/A')}")
                print(f"     Email: {doc.get('email', 'N/A')}")
                print(f"     Criado em: {doc.get('createdAt', 'N/A')}")
                print()
        
        # Testar inserção (e remoção imediata)
        print("🧪 Testando operação de escrita...")
        test_doc = {
            "_id": "test_connection_doc",
            "type": "test",
            "message": "Teste de conexão",
            "timestamp": "2024-01-01T00:00:00Z"
        }
        
        try:
            collection.insert_one(test_doc)
            print("✅ Inserção bem-sucedida")
            
            # Remover documento de teste
            collection.delete_one({"_id": "test_connection_doc"})
            print("✅ Remoção bem-sucedida")
        except Exception as e:
            print(f"⚠️  Aviso ao testar escrita: {str(e)}")
        
        print("\n" + "=" * 60)
        print("✅ TESTE CONCLUÍDO COM SUCESSO!")
        print("=" * 60)
        
        client.close()
        return True
        
    except ConnectionFailure as e:
        print(f"\n❌ ERRO DE CONEXÃO:")
        print(f"   {str(e)}")
        print("\n💡 Possíveis soluções:")
        print("   1. Verifique se a URI do MongoDB está correta")
        print("   2. Verifique sua conexão com a internet")
        print("   3. Verifique se o IP está na whitelist do MongoDB Atlas")
        print("   4. Verifique as credenciais de acesso")
        return False
        
    except Exception as e:
        print(f"\n❌ ERRO INESPERADO:")
        print(f"   {str(e)}")
        import traceback
        print("\n📋 Stack trace:")
        print(traceback.format_exc())
        return False

if __name__ == "__main__":
    success = test_mongodb_connection()
    sys.exit(0 if success else 1)
