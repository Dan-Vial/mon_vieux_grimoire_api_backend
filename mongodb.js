import { connect } from 'mongoose';
const uri = "mongodb+srv://dandavevial:KS8qJ9bQUc1T5VNf@cluster0.jajw92a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

try {
  const client = await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  if (client) {
    console.log('Connexion à MongoDB réussie !')
  }
} catch (error) {
  console.log('Connexion à MongoDB échouée ! Error: ', error);
}
