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

      {/* Main content: cresce per occupare lo spazio disponibile */}
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
          <Typography 
            variant="h4" 
            component="h1" 
            align="left" 
            fontWeight="bold" 
            gutterBottom 
            sx={{ mb: 4 }}
          >
            Chi siamo
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            La nostra missione non è solo segnalarti ottimi <strong>bonus per guadagnare</strong> qualche extra ogni mese,
            ma soprattutto <strong>formarti e guidarti</strong> nel mondo delle opportunità online. Internet è pieno di
            piattaforme ingannevoli (oltre il 95% sono truffe o inutili), ed è fondamentale imparare a distinguere le
            vere occasioni da quelle pericolose.
          </Typography>

          <Typography component="p" sx={{ mb: 3 }}>
            Per riuscirci, serve <strong>studio costante</strong>. Ti invitiamo a formarti ogni giorno, anche solo con contenuti
            gratuiti su YouTube o seguendo le guide della nostra community.
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
