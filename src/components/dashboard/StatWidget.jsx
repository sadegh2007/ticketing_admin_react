import {ReactSVG} from "react-svg";

const StatWidget = (props) => {
  return (
      <div className="card rounded shadow bg-base-100 p-0">
          <div className="card-body text-center flex flex-row items-center p-4 pl-6">
              <div className={`p-5 rounded-lg ${props.iconBackground ? props.iconBackground : 'bg-gray-100'}`}>
                  {
                      props.icon ? <ReactSVG className={props.iconColor ? props.iconColor : null} src="/src/assets/svgs/users.svg" /> : null
                  }
              </div>
              <div className="mr-2 text-right">
                  <p className="text-xs text-gray-500 mb-1">{props.title}</p>
                  <p className="text-xl">{props.value}</p>
              </div>
          </div>
      </div>
  );
}

export default StatWidget;