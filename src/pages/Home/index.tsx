import '../pages.css';
import CarouselPrincipal from '../../components/Carousel';
import CardEvento from '../../components/CardEvento';
import CardGrupo from '../../components/CardGrupo';

export default function Home(){
    return(

        <div className="">
            <CarouselPrincipal></CarouselPrincipal>
            <CardGrupo></CardGrupo>
        </div>
        
    );
}