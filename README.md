# blip-challenge
Desafio fluxo de conversa chatbot com integração da blip

### API RESTful publicada em:
https://blip-challenge-855765643284.us-central1.run.app

### Tendo como path principal:
/v1/github/repos?org=takenet&quantity=5&lang=C%23

Essa rota retorna exatamente os 5 repositórios mais antigos em C# do Github da takenet, mas temos alguns parametros que permitem a alteração da org, linguagem e quantidade retornada.

### Correções:
No bloco de boas vindas do FIGMA existem 2 erros nos textos.
Tomei a liberdade de corrigir no fluxo que será enviado:

"Olá, espero que esteja tudo." => "Olá, espero que esteja tudo **bem**."
</br>
"Mesmo eu sendo um robô e não tendo consciência sobre o que **é** valores..." => "Mesmo eu sendo um robô e não tendo consciência sobre o que **são** valores..."