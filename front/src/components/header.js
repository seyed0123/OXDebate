import React from "react";

class Header extends React.Component{
    render() {
        return (
            <div>

                <header className={'header-img-wrapper'}>
                    <h1 align={'center'} className={'header-text'}>OXDebate</h1>
                    <img src={require('../assets/icon.jpg')} className={'header-img'}/>
                </header>
            </div>
        );
    }
}

export default Header