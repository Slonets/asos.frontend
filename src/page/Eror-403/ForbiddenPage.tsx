import './styles.scss';
import {Link} from "react-router-dom";

const ForbiddenPage = () => {
    return (

        <div className="main">
        <div className={"forbidden"}>
            <header className="intro">
                <h1 className="intro__headline">403</h1>
                <p className="intro__subhead">Вам відмовлено в доступі</p>
                <Link className="magic-light" to="/" >Повернутися на головну</Link>
            </header>
        </div>
        </div>
    )
}

export default ForbiddenPage;
