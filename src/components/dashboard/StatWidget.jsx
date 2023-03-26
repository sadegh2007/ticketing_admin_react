import {ReactSVG} from "react-svg";

const StatWidget = ({iconBackground, icon, value, title, iconColor, valueSuffix}) => {
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
                  <div className="flex items-center">
                    <p className="text-xl grow-0">{value}</p>
                      {
                          valueSuffix ? <p className="text-sm mr-1 text-gray-500">{valueSuffix}</p> : undefined
                      }
                  </div>
              </div>
          </div>
      </div>
  );
}

export default StatWidget;