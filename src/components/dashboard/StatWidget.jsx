import {ReactSVG} from "react-svg";

const StatWidget = ({iconBackground, icon, value, title, iconColor}) => {
  return (
      <div className="card rounded shadow bg-base-100 p-0">
          <div className="card-body text-center flex flex-row items-center p-4 pl-6">
              <div className={`p-5 rounded-lg ${iconBackground ? iconBackground : 'bg-gray-100'}`}>
                  {
                      icon ? <ReactSVG className={iconColor ? iconColor : null} src={icon} /> : null
                  }
              </div>
              <div className="mr-2 text-right">
                  <p className="text-xs text-gray-500 mb-1">{title}</p>
                  <p className="text-xl">{value}</p>
              </div>
          </div>
      </div>
  );
}

export default StatWidget;