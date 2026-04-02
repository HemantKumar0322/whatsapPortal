import { Steps } from 'antd'

const Stepper = (props: any) => {

  const { trackingSteps } = props;

  return (
    <div className="">

      <Steps
        // current={current}
        // onChange={onChange}
        direction="vertical"
        size="small"
        // disabled={true}
        // items={[
        //   {
        //     title: <span>Delivered - <span className="text-[#3764DC] font-semibold">12-11-2025</span></span>,
        //     description: <div className="flex flex-col">
        //       <p className="text-[12px] text-[#000000] font-normal ">DELIVERED - PARCEL LOCKER</p>
        //       <p className="text-[12px] text-[#000000] font-normal ">Henderson, NV, US</p>
        //     </div>,
        //     // status: 'finish',
        //   },
        //   {
        //     title: 'DELIVERED2',
        //     description: 'Delivered',
        //     // status: 'finish',
        //   },
        //   {
        //     title: 'DELIVERED3',
        //     description: 'Delivered',
        //     // status: 'finish',
        //   },
        // ]}
        items={trackingSteps}
      />

    </div>
  )
}

export default Stepper