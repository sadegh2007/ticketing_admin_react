const Card = (props) => {
    return (
        <div {...props} className={`card rounded bg-base-100 shadow ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Card;