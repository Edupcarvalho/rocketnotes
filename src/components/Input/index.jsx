import { Container } from "./styles";

export function Input({icon: Icon, ...rest}){
    return(

        <Container>
            {/* //só vai mostrar o ícone se existir */}
            {Icon && <Icon size={20}/>}
            <input {...rest}/>
        </Container>

    );
}