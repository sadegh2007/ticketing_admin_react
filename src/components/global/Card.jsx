import {ReactSVG} from "react-svg";

const Card = ({className, title, icon, children, withBorder = true}) => {
    return (
        <div className={`card rounded bg-base-100 shadow text-gray-500 ${className}`}>
            {
                title
                    ? <div className="flex items-center pt-3 pr-3 mb-2">
                        <ReactSVG src={icon} />
                        <span className="mr-1 font-semibold">{title}</span>
                    </div>
                    : undefined
            }
            <div className={`card-body p-3 ${withBorder ? 'border rounded m-2 mt-0': ''}`}>
                {/*<div className="border rounded p-4">*/}
                    {children}
                {/*</div>*/}
            </div>
        </div>
    );
}

export default Card;