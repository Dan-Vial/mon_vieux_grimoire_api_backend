import { connect } from 'mongoose';
const uri = process.env.URL_MONGOOSE_DB;

try {
  const client = await connect(uri)
  if (client) {
    console.log('Connexion à MongoDB réussie !')
  }
} catch (error) {
  console.log('Connexion à MongoDB échouée ! Error: ', error);
}
