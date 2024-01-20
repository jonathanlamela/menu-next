# next-menu

Questa è un applicazione nextjs di prova. Si tratta di un e-commerce per un ristorante che integra un back office e pagamenti con stripe.

### Utils stripe

Comandi da utili per provare i pagamenti in locale.

Per indirizzare il traffico stripe al webhook locale
`stripe listen --forward-to http://localhost:3000/stripe`

Per simulare un evento di pagamento (senza il metadata ma solo per verificare che il webhook riesca ad accedere al listener locale)
`stripe trigger checkout.session.completed`
