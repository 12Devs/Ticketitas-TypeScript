import '../pages.css';
import CarouselPrincipal from '../../components/Carousel';
import CardEvento from '../../components/CardEvento';
import CardGrupo from '../../components/CardGrupo';
import NavBarGeral from '../../components/NavBarGeral';
export default function Home(){
    return(
        <>
        <NavBarGeral user='default'/>
        <div className="">
            <CarouselPrincipal></CarouselPrincipal>
            <CardGrupo></CardGrupo>
        </div>
        </>
        
    );
}