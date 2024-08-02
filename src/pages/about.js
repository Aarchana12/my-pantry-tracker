import { Container, Typography, Box, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import NavBar from '../components/NavBar';

const features = [
  {
    title: 'Easy Tracking',
    description: 'Keep track of all your pantry items with ease, ensuring you never run out of essentials.',
  },
  {
    title: 'Quick Updates',
    description: 'Easily add, update, and delete pantry items as you manage your inventory.',
  },
  {
    title: 'Search Functionality',
    description: 'Quickly find any item in your pantry using the powerful search feature.',
  },
  {
    title: 'User-Friendly Interface',
    description: 'Enjoy a simple and intuitive interface designed for a seamless user experience.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const About = () => {
  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to My Pantry Tracker! Here, you can manage and keep track of all your pantry items. Our app helps you easily add, update, and search for pantry items, ensuring you never run out of essentials.
          </Typography>
        </motion.div>
        <Box mt={4}>
          <Typography variant="h5" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body2">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default About;
