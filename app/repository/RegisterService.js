import { auth, dbFirebase } from '../../.expo/credentials' //cambiar
import { createUserWithEmailAndPassword } from 'firebase/auth' //cambiar
import { addDoc, collection } from 'firebase/firestore' //cambiar

//Pantalla que requiere la edad del usuario
const RegisterService = async(props) => {
    const { email, password, name, gender } = props.route.params
    const avatar = ''
    const beginnerMedal = 0
    const intermediateMedal = 0
    const advanceMedal = 0
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        const newUser = {
            id: user.uid,
            email: user.email,
            name: name,
            gender: gender,
            avatar: avatar,
            beginnerMedal: beginnerMedal,
            intermediateMedal: intermediateMedal,
            advanceMedal: advanceMedal
        };

        //Guardar los datos del usuario en Firestore
        await addDoc(collection(dbFirebase, 'users'),{
            ...newUser
        })
        
    } catch (error) {
        console.error('Error durante el registro:', error);
    }
}

export default RegisterService