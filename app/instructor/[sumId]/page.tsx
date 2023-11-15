import SummaryWrapper from "@/app/component/SummaryWrapper";
import Summary from "@/app/datas/Summary";
import summaryData from "@/helpers/getAllSummary";


type Params = {
    params: {
        sumId: string,
    }
}

const page = async ({ params: { sumId } }: Params) => {
    const sumdata = await summaryData()
    const sum: typeof sumdata = sumdata.data.filter((item: any) => item.courseId === sumId);


    return (
        <div className="px-[1rem] sm:px-[7rem] lg:px-[10rem] min-h-[67vh]">
            <h2 className="mt-10 mb-4 sm:text-[30px] text-[24px] font-bold leading-8">Instructor Dashboard</h2>
            <h2 className="mt-2 mb-4 text-gray-500 sm:text-[21px] text-[18px] font-bold leading-8">Course Content</h2>
       

            <SummaryWrapper summaryid={sumId} summary={sum} />
        </div>
    );
};

export default page;
