import React from 'react';

const Player = () => {

    const [top, setTop] = useState(0);
    const [left, setLeft] = useState(0);

    React.useEffect(() => {
        window.addEventListener('keydown', function(event) {
            var player = document.querySelector(".player");
            var {style} = player;
            // switch(event.key) {
            //     case 'ArrowUp': style.top = `${parseInt(style.top) - 6}vh`;
            //         break;
            //     case 'ArrowDown': style.top = `${parseInt(style.top) + 6}vh`;
            //         break;
            //     case 'ArrowLeft': style.left = `${parseInt(style.left) - 6}vh`;
            //         break;
            //     case 'ArrowLeft': style.left = `${parseInt(style.left) + 6}vh`;
            //         break;            
            // }
            switch(event.key) {
                case 'ArrowUp': setTop(top - 6);
                    break;
                case 'ArrowDown': setTop(top - 6);
                    break;
                case 'ArrowLeft': style.left = `${parseInt(style.left) - 6}vh`;
                    break;
                case 'ArrowLeft': style.left = `${parseInt(style.left) + 6}vh`;
                    break;            
            }
            return () => {
                window.removeEventListener('keydown', event);
            };
        });
    }, []);
    return (
        <div className="player" style=''> 
            {"."} 
        </div>
    );
}

export default Player;