import { auth, dbFirebase } from '../../.expo/credentials'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore' 

//Pantalla que requiere la edad del usuario
const RegisterService = async(props) => {
    const { email, password, name, gender } = props.route.params
    const avatar = ''
    
    console.log('CAGA ANTES DE LLAMAR AL AUTH')

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    
    console.log('CAGA ANTES DEL NEWUSER')
    //Se guardan solo el id y el email, el password se encarga Firebase Authr
    const newUser = {
        id: user.uid,
        name: name,
        email: user.email,
        gender: gender,
        avatar: avatar
    }   

    console.log('CAGA ANTES DE TOCAR EL ADDDOC')
    //Guardar los datos del usuario en Firestore
    await addDoc(collection(dbFirebase, 'users'),{
        ...newUser
    })
    console.log('CHUCHETUMARE')
}

export default RegisterService