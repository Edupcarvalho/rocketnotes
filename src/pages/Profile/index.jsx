import {useState} from 'react';
import {useAuth} from '../../hooks/auth';
import {FiArrowLeft, FiUser, FiMail, FiLock, FiCamera} from 'react-icons/fi';
import { Link } from "react-router-dom";
import { Container, Form, Avatar} from "./styles";
import {Input} from "../../components/Input";
import {Button} from "../../components/Button";
import { api } from '../../services/api';
import avatarPlaceholder from "../../assets/avatar_placeholder.svg"

export function Profile(){
    const {user, updateProfile} = useAuth();

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPassworNew] = useState();

    
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] =  useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);

    async function handleUpdate(){
        const update = {
            name,
            email,
            old_password: passwordOld,
            password: passwordNew,
        }
        const userUpdate = Object.assign(user, update);

        await updateProfile({user: userUpdate, avatarFile});
    }

    function handleChangeAvatar(event){
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return(

        <Container>
            <header>
                <Link to="/">
                    <FiArrowLeft/>
                </Link>
            </header>
            <Form>
                <Avatar>
                    <img src={avatar} alt="Foto do Usuário"/>
                    <label htmlFor='avatar'>
                        <FiCamera/>
                        <input
                        
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvatar}

                        />

                    </label>
                </Avatar>
                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}


                />
                <Input
                    placeholder="Senha atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}

                />
                <Input
                    placeholder="Nova Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPassworNew(e.target.value)}

                />
                <Button title="Salvar" onClick={handleUpdate}/>
            </Form>
        </Container>
    );
}