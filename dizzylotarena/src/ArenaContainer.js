import Arena from "./Arena";

const ArenaContainer = ({rows, columns}) => {
    return (
        <div> 
            <Arena rows={rows} columns={columns}/> 
        </div>
    );
}

export default ArenaContainer;