'use client';

import { Box, Container, Typography, Link as MuiLink, List, ListItem } from '@mui/material';
import Footer from '@/components/Home/Footer';
import Navbar from '@/components/Home/Navbar';

export default function AboutPage() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh' 
      }}
    >
      <Navbar>
        <></>
      </Navbar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md" sx={{ width: '80%' }}>

        <Typography variant="h4" component="h1" align="left" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
            Come funziona?
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Molte aziende per aumentare il numero di utenti fanno delle promozioni usando dei <strong>Referral Link</strong> che gli utenti possono condividere coi loro amici che ancora non si sono iscritti alla piattaforma in questione. Quando i tuoi amici utilizzeranno il tuo Referral Link, entrambi otterrete dei vantaggi!
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Se sei già pratico di questo sistema, probabilmente ti sarà successo di esaurire le persone a cui condividere il tuo link.
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Come fare in questi casi?
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Facile: puoi diffondere il tuo codice su BonusCenter, dove potrà essere utilizzato da chiunque, così continuerai a ricevere i tuoi guadagni.
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            E se invece stai cercando uno o più Referral Link (o codici amico) ma non sai a chi chiedere o dove trovarli?
          </Typography>

          <Typography component="p" sx={{ mb: 6 }}>
            Anche qui la soluzione è semplice: li trovi tutti su BonusCenter!
          </Typography>

          <Typography variant="h4" component="h1" align="left" fontWeight="bold" gutterBottom sx={{ mb: 4 }}>
            Chi siamo
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            La nostra missione non è solo segnalarti ottimi <strong>bonus per guadagnare</strong> qualche extra ogni mese,
            ma soprattutto <strong>formarti e guidarti</strong> nel mondo delle opportunità online. Internet è pieno di
            piattaforme ingannevoli (oltre il 95% sono truffe o inutili), ed è fondamentale imparare a distinguere le
            vere occasioni da quelle pericolose.
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Il nostro team testa e analizza continuamente nuove app, carte e piattaforme. Leggiamo i regolamenti,
            verifichiamo che i bonus vengano pagati realmente e prepariamo una <strong>guida dettagliata</strong> per ogni
            opportunità.
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Molte delle promozioni si basano su <strong>link d'invito (referral)</strong>: alcune app regalano un bonus
            all’iscrizione tramite un link speciale o un codice, altre premiano anche chi invita. Per ogni app, troverai
            sulla nostra pagina sia il link pubblico accanto al logo, sia il codice da inserire se necessario.
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Il nostro consiglio è di registrarti a tutte le app disponibili e poi condividerle a tua volta con amici,
            parenti o conoscenti per ottenere i bonus di invito.
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            I bonus che segnaliamo si dividono principalmente in due categorie:
          </Typography>

          <List sx={{ pl: 4, mb: 4 }}>
            <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
              <strong>Bonus di benvenuto:</strong> ricevuto al momento della registrazione tramite il nostro link/codice.
            </ListItem>
            <ListItem sx={{ display: 'list-item', p: 0 }}>
              <strong>Bonus per invito:</strong> guadagnato ogni volta che qualcuno si iscrive con il tuo link e completa i requisiti.
            </ListItem>
          </List>

          <Typography component="p" sx={{ mb: 3 }}>
            Le promozioni cambiano di frequente, quindi è importante restare aggiornati, controllare le scadenze e leggere
            sempre i termini. <strong>Solo app che pagano davvero</strong> vengono pubblicate: lasciamo perdere le truffe o i servizi ingannevoli.
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Unisciti a noi e trasforma ogni app in un'opportunità concreta. Il web è pieno di possibilità, se sai dove
            cercare!
          </Typography>

        </Container>
      </Box>

      <Footer />
    </Box>
  );
}
