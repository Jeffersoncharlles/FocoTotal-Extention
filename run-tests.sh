#!/bin/bash
# Script para rodar testes sem interferência do watch mode

# Mata todos os processos vitest
pkill -9 -f vitest 2>/dev/null

# Espera um pouco
sleep 2

# Roda os testes
npm test -- --run

echo "Testes concluídos!"
