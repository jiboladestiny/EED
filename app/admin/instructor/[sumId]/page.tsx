

import SummaryWrapper from "@/app/component/SummaryWrapper";
import Summary from "@/app/datas/Summary";


type Params = {
    params: {
        sumId: string,
    }
}

const page = async ({ params: { sumId } }: Params) => {
    const summary: typeof Summary = Summary.filter((item) => item.courseId === parseInt(sumId));


    return (
        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
            <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">Instructor Dashboard</h2>
            <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Course</h2>

            <SummaryWrapper summary={summary}/>
        </div>
    );
};

export default page;
