import {Component} from "react"
import Hero from "../components/Hero"
import {Link} from "react-router-dom"
import Banner from "../components/Banner"

export default class Error extends Component {
render(){
    return(
        <Hero hero="errorHero">
            <Banner title="404" subtitle="Ops Page not found!">
                <Link to="/" className="btn-primary" >Return Home</Link>
            </Banner>
        </Hero>
    )
}
}