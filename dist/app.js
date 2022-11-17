//variables
const formulario    = document.getElementById('formulario');
const listaTweets   = document.getElementById('tweets');
let tweets = [];

//Event listeners
const eventListeners = ()=>{
    formulario.addEventListener('submit', agregarTweet);

    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets') || []);
        inserrTweets();
    })
}
eventListeners();
//Funciones
function agregarTweet (e){
    e.preventDefault();

    const tweet = document.getElementById('tweet').value;

    if(tweet === ''){
        mostrarError('el tweet no debe estar vacio....');
        return;//evita que se ejecuten más linas de código 
    }


    const tweetObj = {
        //simulamos un ID
        id: Date.now(),
        texto : tweet,
    }

    //Añadir el tweet al array de tweets
    tweets = [...tweets, tweetObj]
    console.log(tweets);

    //una vez añadimos los tweets lo insertamos en el DOM
    inserrTweets();

    formulario.reset();
}
//Mostrar mensaje de error
const mostrarError = (mensaje) =>{
    const mensajeError = document.createElement('span');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('hero__error');

    //Insertarlo el mesaje de error
    const heroRight = document.getElementById('hero-right');
    heroRight.append(mensajeError);

    setTimeout(()=>{
        mensajeError.remove();
    }, 3000)
}

const inserrTweets = ()=>{

    limpiarDom();

    if(tweets.length > 0){
        const fragment = document.createDocumentFragment();

        tweets.forEach(tweet =>{
            const p = document.createElement('p');
            const btn = document.createElement('buttom');

            p.textContent = tweet.texto;
            btn.textContent = 'X';
            btn.onclick = ()=>{
                borrarTweet(tweet.id);//pasamos el id para borrar el tweet
            }
            p.append(btn);

            p.classList.add('hero__p');
            btn.classList.add('hero__buttom');
            fragment.append(p);
        })

        listaTweets.append(fragment);
    }

    almacenarStorage();
}

const limpiarDom = ()=>{
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

const borrarTweet = (id) =>{
    tweets = tweets.filter( tweet => tweet.id !== id);
    console.log(tweets);
    inserrTweets();
}

const almacenarStorage = () =>{
    localStorage.setItem('tweets', JSON.stringify(tweets));
}