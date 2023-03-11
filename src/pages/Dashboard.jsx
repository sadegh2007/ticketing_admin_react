import StatWidget from "../components/dashboard/StatWidget.jsx";
import DashboardLayout from "../components/layouts/DashboardLayout.jsx";
import Breadcrumb from "../components/global/Breadcrumb.jsx";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Filler
} from "chart.js";
import {Doughnut as DoughnutChart, Line as LineChart, Bar as BarChart} from "react-chartjs-2";

const Dashboard = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler);
    ChartJS.defaults.borderColor = 'transparent';
    ChartJS.defaults.font.family = 'IRAN_SANS_X';

    const testData = {
        labels: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
        datasets: [
            {
                borderWidth: 1.5,
                fill: 'start',
                cubicInterpolationMode: 'monotone',
                // backgroundColor: 'rgba(96, 165, 250,0.2)',
                backgroundColor: (ctx) => {
                    const canvas = ctx.chart.ctx;
                    const gradient = canvas.createLinearGradient(0, 0, 0, 260);

                    gradient.addColorStop(0, 'rgba(96, 165, 250,0.2)');
                    gradient.addColorStop(0.3, 'rgba(96, 165, 250,0.2)');
                    gradient.addColorStop(1, 'transparent');

                    return gradient;
                },
                borderColor: 'rgb(96, 165, 250)',
                data: [30, 40, 60, 70, 5, 8, 8, 0, 1, 4, 3, 8],
                // backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                ticks: {},
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    display: true,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                position: "bottom",
            },
        },
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        // cutoutPercentage: 80,
        plugins: {
            legend: {
                display: false,
                position: "bottom",
            },
        },
    };

    const weekSaleOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                ticks: {
                    display: false,
                },
                grid: {
                    display: false,
                },
            },
        }
    };

    const doTestData = {
        labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
        datasets: [
            {
                fill: true,
                cubicInterpolationMode: 'monotone',
                data: [30, 40, 60, 70, 50, 80, 20],
                backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED', '#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
            },
        ],
    };

    const weekSaleTestData = {
        labels: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'],
        datasets: [
            {
                borderRadius: 8,
                fill: true,
                cubicInterpolationMode: 'monotone',
                data: [30, 40, 60, 70, 50, 80, 20],
                backgroundColor: '#77CEFF',
            },
        ],
    };

    return (
        <>
            <Breadcrumb/>

            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
                <StatWidget
                    value={424}
                    title="تعداد کاربران"
                    icon="/src/assets/svgs/users.svg"
                    iconBackground="bg-blue-400"
                    iconColor="text-base-100"
                />

                <StatWidget
                    value={124000000}
                    title="مبلغ کل فروش"
                    icon="/src/assets/svgs/dollar_with_circle.svg"
                    iconBackground="bg-green-300"
                    iconColor="text-base-100"
                />

                <StatWidget
                    value={124000}
                    title="تعداد فروش"
                    icon="/src/assets/svgs/123.svg"
                />

                <StatWidget
                    value={165}
                    title="تعداد محصولات"
                    icon="/src/assets/svgs/brand-product-hunt.svg"
                />
            </div>

            <div className="mt-4 grid grid-flow-row-dense gap-3 lg:grid-cols-3 grid-rows-1 sm:grid-flow-row">
                <div className="lg:col-span-2 sm:col-span-1 card shadow bg-base-100 p-0">
                    <div className="text-center">
                        <p className="text-xs font-bold p-2 pt-4 pr-4 text-gray-500">فروش ۱۲ ماه گذشته</p>
                    </div>
                    <div className="divider m-0 p-0"></div>
                    <div className="card-body p-4">
                        <LineChart className="h-72" options={lineChartOptions} data={testData}/>
                    </div>
                </div>

                <div className="card shadow bg-base-100 p-0">
                    <div className="text-center">
                        <p className="text-xs font-bold p-2 pt-4 pr-4 text-gray-500">تعداد فروش های هفته روز گذشته</p>
                    </div>
                    <div className="divider m-0 p-0"></div>
                    <div className="card-body p-4">
                        <DoughnutChart className="h-72" options={doughnutOptions} data={doTestData}/>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-flow-row-dense gap-3 lg:grid-cols-3 grid-rows-1 sm:grid-flow-row">
                <div className="card shadow bg-base-100 p-0">
                    <div className="text-center">
                        <p className="text-xs font-bold p-2 pt-4 pr-4 text-gray-500">فروش ۷ روز گذشته</p>
                    </div>
                    <div className="divider m-0 p-0"></div>
                    <div className="card-body p-4">
                        <BarChart className="max-h-44" options={weekSaleOptions} data={weekSaleTestData}/>
                        <div className="p-3 text-sm">
                            <div className="divider p-0 m-0"></div>
                            <p className="py-1">بیشترین فروش: 1,200,000 تومان</p>
                            <div className="divider p-0 m-0"></div>
                            <p className="py-1">کمترین فروش: 200,000 تومان</p>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 sm:col-span-1 card shadow bg-base-100">
                    <div className="text-center">
                        <p className="text-xs font-bold p-2 pt-4 pr-4 text-gray-500">10 کاربر عضو شده اخیر</p>
                    </div>
                    <div className="divider m-0 p-0"></div>
                    <div className="card-body p-0 pb-3 h-72">
                        <div className="overflow-x-auto w-full">
                            <table className="table table-compact w-full text-sm pt-0 mt-0">
                                <tbody>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>

                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src="/src/assets/user-placeholder.png"
                                                         alt="Avatar Tailwind CSS Component"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>صادق حاجی زاده</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        09352760765
                                        <br/>
                                    </td>
                                    <td>1372/01/27</td>
                                    <th>
                                        <button className="btn btn-outline btn-info btn-sm font-normal">مشاهده
                                        </button>
                                    </th>
                                </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Dashboard;