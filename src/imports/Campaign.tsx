import svgPaths from "./svg-4665fha2gx";
import { imgGroup } from "./svg-8na2u";

function Heading() {
  return (
    <div className="h-[24px] relative shrink-0 w-[150.859px]" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[150.859px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-0 not-italic text-[24px] text-gray-900 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Campaign Scheduler</p>
      </div>
    </div>
  );
}

function Icon() {
  return (
    <div className="absolute left-[24px] size-[20px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M4.16667 10H15.8333" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 4.16667V15.8333" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[#d9480f] h-[44px] relative rounded-[10px] shrink-0 w-[186px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[186px]">
        <Icon />
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-[52px] not-italic text-[16px] text-nowrap text-white top-[10px] tracking-[-0.3125px] whitespace-pre">New Campaign</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading />
      <Button />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[24px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Manage your DOOH advertising campaigns with multiple ad groups</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[76px] items-start left-[297px] top-[102px] w-[1107px]" data-name="Container">
      <Container />
      <Paragraph />
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[27px] left-0 not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">All Campaigns</p>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-gray-50 h-[60px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[60px] items-start pb-px pt-[16px] px-[24px] relative w-full">
          <Heading1 />
        </div>
      </div>
    </div>
  );
}

function HeaderCell() {
  return (
    <div className="box-border content-stretch flex h-[41px] items-center p-[16px] relative shrink-0 w-[338px]" data-name="Header Cell">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-gray-500">Campaign</p>
    </div>
  );
}

function HeaderCell1() {
  return (
    <div className="box-border content-stretch flex h-[41px] items-center p-[16px] relative shrink-0 w-[109px]" data-name="Header Cell">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-gray-500">Status</p>
    </div>
  );
}

function HeaderCell2() {
  return (
    <div className="box-border content-stretch flex h-[41px] items-start px-[24px] py-[12px] relative shrink-0 w-[290px]" data-name="Header Cell">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-gray-500">Ad Groups</p>
    </div>
  );
}

function HeaderCell3() {
  return (
    <div className="box-border content-stretch flex h-[40.5px] items-start px-[24px] py-[12px] relative shrink-0 w-[135.922px]" data-name="Header Cell">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-gray-500">Impressions</p>
    </div>
  );
}

function HeaderCell4() {
  return (
    <div className="box-border content-stretch flex h-[41px] items-start px-[24px] py-[12px] relative shrink-0 w-[244px]" data-name="Header Cell">
      <p className="basis-0 font-['Inter:Bold',sans-serif] font-bold grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-gray-500 text-right">Actions</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <HeaderCell />
      <HeaderCell1 />
      <HeaderCell2 />
      <HeaderCell3 />
      <HeaderCell4 />
    </div>
  );
}

function TableHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full" data-name="Table Header">
      <TableRow />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Acme Corporation - November 2025 Campaign</p>
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic relative shrink-0 text-nowrap w-full whitespace-pre">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-gray-500">Client :</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-gray-900 tracking-[-0.1504px]">Acme Corporation</p>
    </div>
  );
}

function TableCell() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-start p-[16px] relative shrink-0 w-[338px]" data-name="Table Cell">
      <Paragraph1 />
      <Frame2 />
    </div>
  );
}

function Text() {
  return (
    <div className="bg-blue-100 h-[23px] relative rounded-[4px] shrink-0 w-full" data-name="Text">
      <div className="size-full">
        <div className="box-border content-stretch flex h-[23px] items-start px-[8px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-blue-800 text-nowrap whitespace-pre">Scheduled</p>
        </div>
      </div>
    </div>
  );
}

function TableCell1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center p-[16px] relative self-stretch shrink-0" data-name="Table Cell">
      <Text />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[16.5px] w-[274.609px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">2 ad groups</p>
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[24px] top-[38.5px] w-[274.609px]" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-gray-500">Weekday Morning Ads, Weekend Schedule</p>
    </div>
  );
}

function TableCell2() {
  return (
    <div className="box-border content-stretch flex gap-[10px] items-center px-[10px] py-[16px] relative shrink-0" data-name="Table Cell">
      <Paragraph2 />
      <Paragraph3 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">—</p>
    </div>
  );
}

function TableCell3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-[24px] py-[26px] relative self-stretch shrink-0 w-[135.922px]" data-name="Table Cell">
      <Paragraph4 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 2L13.3333 8L4 14V2Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon1 />
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1ca41d89} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon2 />
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon4 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
    </div>
  );
}

function TableCell4() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] items-start justify-center px-[16px] py-[20px] relative self-stretch shrink-0 w-[244px]" data-name="Table Cell">
      <Container3 />
    </div>
  );
}

function TableRow1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full" data-name="Table Row">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <TableCell />
      <TableCell1 />
      <TableCell2 />
      <TableCell3 />
      <TableCell4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Diwali 2025 Offer</p>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[4px] items-center not-italic relative shrink-0 text-nowrap w-full whitespace-pre">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[16px] relative shrink-0 text-[12px] text-gray-500">Client :</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] relative shrink-0 text-[14px] text-gray-900 tracking-[-0.1504px]">Acme Corporation</p>
    </div>
  );
}

function TableCell5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[4px] items-start justify-center p-[16px] relative shrink-0 w-[338px]" data-name="Table Cell">
      <Paragraph5 />
      <Frame3 />
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-green-100 h-[23px] relative rounded-[4px] shrink-0 w-full" data-name="Text">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex h-[23px] items-center justify-center px-[8px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-green-800 text-nowrap whitespace-pre">Active</p>
        </div>
      </div>
    </div>
  );
}

function TableCell6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-full items-start justify-center p-[16px] relative shrink-0 w-[109px]" data-name="Table Cell">
      <Text1 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[19.5px] w-[274.609px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">2 ad groups</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[24px] top-[41.5px] w-[274.609px]" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-gray-500">Sunday Schedule, Weekday Schedule</p>
    </div>
  );
}

function TableCell7() {
  return (
    <div className="h-[76px] relative shrink-0 w-[290px]" data-name="Table Cell">
      <Paragraph6 />
      <Paragraph7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="absolute h-[20px] left-[24px] top-[28.5px] w-[87.922px]" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">12,547</p>
    </div>
  );
}

function TableCell8() {
  return (
    <div className="h-[76.5px] relative shrink-0 w-[135.922px]" data-name="Table Cell">
      <Paragraph8 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3bff1000} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2916c800} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon5 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p38f39800} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1ca41d89} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon7 />
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p36e45a00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p150f5b00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2d6e5280} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[32px]">
        <Icon8 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex gap-[8px] h-[32px] items-center justify-end relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
    </div>
  );
}

function TableCell9() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[10px] h-full items-start justify-center p-[16px] relative shrink-0 w-[244px]" data-name="Table Cell">
      <Container4 />
    </div>
  );
}

function TableRow2() {
  return (
    <div className="content-stretch flex items-center relative shrink-0 w-full" data-name="Table Row">
      <TableCell5 />
      <div className="flex flex-row items-center self-stretch">
        <TableCell6 />
      </div>
      <TableCell7 />
      <TableCell8 />
      <div className="flex flex-row items-center self-stretch">
        <TableCell9 />
      </div>
    </div>
  );
}

function TableBody() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Table Body">
      <TableRow1 />
      <TableRow2 />
    </div>
  );
}

function Table() {
  return (
    <div className="content-stretch flex flex-col items-start overflow-x-clip overflow-y-auto relative shrink-0 w-full" data-name="Table">
      <TableHeader />
      <TableBody />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute bg-white left-[297px] rounded-[14px] top-[377px] w-[1119px]" data-name="Container">
      <div className="box-border content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] w-[1119px]">
        <Container2 />
        <Table />
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-gray-50 h-[44px] left-0 rounded-[8px] top-0 w-[448px]" data-name="Text Input">
      <div className="box-border content-stretch flex h-[44px] items-center overflow-clip pl-[48px] pr-[16px] py-0 relative rounded-[inherit] w-[448px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-gray-500 text-nowrap whitespace-pre">Search campaigns...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-[16px] size-[20px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p2e7d2400} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pcddfd00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[44px] relative shrink-0 w-[448px]" data-name="Container">
      <TextInput />
      <Icon9 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12824f00} id="Vector" stroke="var(--stroke-0, #111827)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button9() {
  return (
    <div className="bg-gray-50 h-[44px] relative rounded-[8px] shrink-0 w-[99.313px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon10 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[41px] not-italic text-[14px] text-gray-900 text-nowrap top-[12px] whitespace-pre">Filters</p>
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0">
      <Container6 />
      <Button9 />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 10V2" id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p23ad1400} id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3c3ef80} id="Vector_3" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[44px] relative rounded-[8px] shrink-0 w-[99.781px]" data-name="Button">
      <Icon11 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[40px] not-italic text-[#ff5900] text-[14px] text-nowrap top-[12px] whitespace-pre">Export</p>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Frame />
      <Button10 />
    </div>
  );
}

function Text2() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex h-[19px] items-start left-[120.27px] px-[8px] py-[2px] rounded-[3.35544e+07px] top-[11.5px] w-[23.234px]" data-name="Text">
      <p className="capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">5</p>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[44px] relative shrink-0 w-[159.5px]" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#ff5900] border-[0px_0px_2px] border-solid inset-0 pointer-events-none" />
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[#ff5900] text-[14px] text-nowrap top-[10.5px] whitespace-pre">All Campaigns</p>
      <Text2 />
    </div>
  );
}

function Text3() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex h-[19px] items-start left-[66.19px] px-[8px] py-[2px] rounded-[3.35544e+07px] top-[12.5px] w-[20.984px]" data-name="Text">
      <p className="capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">1</p>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[44px] relative shrink-0 w-[103.172px]" data-name="Button">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[14px] text-gray-500 text-nowrap top-[11.5px] whitespace-pre">active</p>
      <Text3 />
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex h-[19px] items-start left-[95.27px] px-[8px] py-[2px] rounded-[3.35544e+07px] top-[12.5px] w-[20.984px]" data-name="Text">
      <p className="capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">1</p>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[44px] relative shrink-0 w-[132.25px]" data-name="Button">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[14px] text-gray-500 text-nowrap top-[11.5px] whitespace-pre">scheduled</p>
      <Text4 />
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex h-[19px] items-start left-[97.08px] px-[8px] py-[2px] rounded-[3.35544e+07px] top-[12.5px] w-[20.984px]" data-name="Text">
      <p className="capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">1</p>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[44px] relative shrink-0 w-[134.063px]" data-name="Button">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[14px] text-gray-500 text-nowrap top-[11.5px] whitespace-pre">completed</p>
      <Text5 />
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex h-[19px] items-start left-[64.41px] px-[8px] py-[2px] rounded-[3.35544e+07px] top-[12.5px] w-[23.75px]" data-name="Text">
      <p className="capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">0</p>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[44px] relative shrink-0 w-[104.156px]" data-name="Button">
      <p className="absolute capitalize font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[16px] not-italic text-[14px] text-gray-500 text-nowrap top-[11.5px] whitespace-pre">drafts</p>
      <Text6 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] items-center relative">
        <Button11 />
        <Button12 />
        <Button13 />
        <Button14 />
        <Button15 />
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="basis-0 grow h-[20px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-gray-500 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">View:</p>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[12.5%_58.33%_58.33%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p1ffb1100} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%_12.5%_58.33%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p1ffb1100} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_12.5%_12.5%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p1ffb1100} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[58.33%_58.33%_12.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-14.29%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p1ffb1100} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="bg-slate-50 relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[32px]">
        <Icon12 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-[12.5%] left-1/2 right-1/2 top-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%_-0.67px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 2 14">
            <path d="M0.666667 0.666667V12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[12.5%]" data-name="Vector">
        <div className="absolute inset-[-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
            <path d={svgPaths.p3b86be00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_12.5%_62.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
            <path d="M0.666667 0.666667H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[62.5%_12.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-0.67px_-5.56%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 2">
            <path d="M0.666667 0.666667H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="bg-[#ff5900] relative rounded-[10px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[32px]">
        <Icon13 />
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[44px] relative shrink-0 w-[123.141px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[44px] items-center relative w-[123.141px]">
        <Text7 />
        <Button16 />
        <Button17 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="box-border content-stretch flex h-[45px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Frame1 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col gap-[24px] h-[161px] items-start left-[297px] pb-0 pt-[24px] px-[24px] rounded-[12px] top-[200px] w-[1119px]" data-name="Container">
      <Container7 />
      <Container9 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M17.5 17.5L13.8833 13.8833" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pcddfd00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function TextInput1() {
  return (
    <div className="bg-gray-50 h-[48px] relative rounded-[8px] shrink-0 w-[403px]" data-name="Text Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[48px] items-center overflow-clip px-[16px] py-0 relative rounded-[inherit] w-[403px]">
        <Icon14 />
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-gray-500 text-nowrap whitespace-pre">Search campaigns, creatives, reports...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon15() {
  return (
    <div className="absolute left-[12px] size-[20px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p31962400} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1f3d9f80} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute bg-amber-500 box-border content-stretch flex items-center justify-center left-[21.94px] p-[2px] rounded-[3.35544e+07px] top-[9.5px] w-[10px]" data-name="Text">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold h-[6px] justify-center leading-[0] not-italic relative shrink-0 text-[6px] text-center text-white w-[5px]">
        <p className="leading-[0px]">5</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[44px]" data-name="Button">
      <Icon15 />
      <Text8 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_136_749)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2e4e0200} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_136_749">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[44px]" data-name="Button">
      <Icon16 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p15ab6200} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[44px]" data-name="Button">
      <Icon17 />
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[18.953px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-0 whitespace-pre">SK</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="bg-gradient-to-b from-[#2b6ef2] relative rounded-[3.35544e+07px] shrink-0 size-[40px] to-[#2459c7]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-[40px]">
        <Text9 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 whitespace-pre">Sarah Khan</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">Digital Agency</p>
    </div>
  );
}

function Container12() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] items-center px-[16px] py-0 relative w-full">
          <Container11 />
          <Container12 />
        </div>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col h-[49px] items-start justify-center relative shrink-0 w-[183px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Button21 />
    </div>
  );
}

function Container14() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[14px] items-center relative">
        <Button18 />
        <Button19 />
        <Button20 />
        <Container13 />
      </div>
    </div>
  );
}

function TopNav() {
  return (
    <div className="absolute bg-white box-border content-stretch flex h-[80px] items-center justify-between left-[273px] pb-[13px] pt-[12px] px-[24px] top-0 w-[1167px]" data-name="TopNav">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <TextInput1 />
      <Container14 />
    </div>
  );
}

function Group() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[155px_13px]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 155 13">
        <g id="Group">
          <path d={svgPaths.pecd9000} fill="var(--fill-0, #1D1D1B)" id="Vector" />
          <path d={svgPaths.pa30b000} fill="var(--fill-0, #1D1D1B)" id="Vector_2" />
          <path d={svgPaths.p3bbffd00} fill="var(--fill-0, #1D1D1B)" id="Vector_3" />
          <path d={svgPaths.p43a7100} fill="var(--fill-0, #1D1D1B)" id="Vector_4" />
          <path d={svgPaths.pab77700} fill="var(--fill-0, #1D1D1B)" id="Vector_5" />
          <path d={svgPaths.p4ca0600} fill="var(--fill-0, #1D1D1B)" id="Vector_6" />
          <path d={svgPaths.p194b3ff0} fill="var(--fill-0, #1D1D1B)" id="Vector_7" />
          <path d={svgPaths.p4b43580} fill="var(--fill-0, #1D1D1B)" id="Vector_8" />
          <path d={svgPaths.p17d92e00} fill="var(--fill-0, #1D1D1B)" id="Vector_9" />
          <g id="Group_2">
            <path d={svgPaths.p3ae8e600} fill="var(--fill-0, #1D1D1B)" id="Vector_10" />
            <path d={svgPaths.p8a6180} fill="var(--fill-0, #FF5900)" id="Vector_11" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Icon18() {
  return (
    <div className="h-[13px] overflow-clip relative shrink-0 w-[155px]" data-name="Icon">
      <ClipPathGroup />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">Media Buyer</p>
    </div>
  );
}

function Container15() {
  return (
    <div className="relative shrink-0 w-[181px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] items-start relative w-[181px]">
        <Icon18 />
        <Paragraph11 />
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 7 12">
            <path d={svgPaths.p3a0d2780} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button22() {
  return (
    <div className="relative rounded-[10px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start pb-0 pt-[8px] px-[8px] relative size-[36px]">
        <Icon19 />
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[80px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[80px] items-center justify-between pb-px pt-0 px-[24px] relative w-full">
          <Container15 />
          <Button22 />
        </div>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[140.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[140.297px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[14px] text-gray-500 text-nowrap top-0 whitespace-pre">{`👋    Welcome`}</p>
      </div>
    </div>
  );
}

function Button23() {
  return (
    <div className="h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center pl-[16px] pr-0 py-0 relative w-full">
          <Text10 />
        </div>
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1fc96a00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p33089d00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p49cfa80} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1cfbf300} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text11() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Dashboard</p>
      </div>
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[48px] items-center left-0 px-[16px] py-0 rounded-[10px] top-0 w-[207px]" data-name="Button">
      <Icon20 />
      <Text11 />
      <Icon21 />
    </div>
  );
}

function ListItem() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button24 />
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p8db9670} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 17.5H13.3333" id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667V17.5" id="Vector_3" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function LayoutShell() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="LayoutShell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-400 top-0 tracking-[-0.3125px] w-[80px]">Monitoring Dashboard</p>
      </div>
    </div>
  );
}

function SlotClone() {
  return (
    <div className="h-[72px] opacity-50 relative rounded-[10px] shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[72px] items-center pl-[48px] pr-[16px] py-0 relative w-full">
          <Icon22 />
          <LayoutShell />
        </div>
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_136_197)" id="Icon">
          <path d={svgPaths.p4a0f700} id="Vector" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p11b86180} id="Vector_2" stroke="var(--stroke-0, #9CA3AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_136_197">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function LayoutShell1() {
  return (
    <div className="basis-0 grow h-[48px] min-h-px min-w-px relative shrink-0" data-name="LayoutShell">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[48px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-400 top-0 tracking-[-0.3125px] w-[80px]">Financial Dashboard</p>
      </div>
    </div>
  );
}

function SlotClone1() {
  return (
    <div className="h-[72px] opacity-50 relative rounded-[10px] shrink-0 w-full" data-name="SlotClone">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[72px] items-center pl-[48px] pr-[16px] py-0 relative w-full">
          <Icon23 />
          <LayoutShell1 />
        </div>
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p25397b80} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p18406864} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2241fff0} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c4f400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Customers</p>
      </div>
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[48px] items-center left-0 px-[16px] py-0 rounded-[10px] top-0 w-[207px]" data-name="Button">
      <Icon24 />
      <Text12 />
    </div>
  );
}

function ListItem1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button25 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_136_383)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p240d7000} id="Vector_2" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p25499600} id="Vector_3" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_136_383">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[75.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[75.563px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#d9480f] text-[14px] text-nowrap top-0 whitespace-pre">Campaigns</p>
      </div>
    </div>
  );
}

function Button26() {
  return (
    <div className="bg-red-50 h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-[#d9480f] border-[0px_0px_0px_4px] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[44px] items-center pl-[20px] pr-0 py-0 relative w-full">
          <Icon25 />
          <Text13 />
        </div>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cec7ff0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M5.83333 2.5V17.5" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 6.25H5.83333" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 10H17.5" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 13.75H5.83333" id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.1667 2.5V17.5" id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.1667 6.25H17.5" id="Vector_7" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M14.1667 13.75H17.5" id="Vector_8" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Media</p>
      </div>
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[48px] items-center left-0 px-[16px] py-0 rounded-[10px] top-0 w-[207px]" data-name="Button">
      <Icon26 />
      <Text14 />
    </div>
  );
}

function ListItem2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button27 />
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M10 10H2.5" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 5H2.5" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 15H2.5" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2e8b6200} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">Playlists</p>
      </div>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[48px] items-center left-0 px-[16px] py-0 rounded-[10px] top-0 w-[207px]" data-name="Button">
      <Icon27 />
      <Text15 />
    </div>
  );
}

function ListItem3() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button28 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_136_190)" id="Icon">
          <path d={svgPaths.p3eef5800} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2f80dd00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_136_190">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[10px] items-center relative">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[24px] not-italic relative shrink-0 text-[16px] text-gray-500 text-nowrap tracking-[-0.3125px] whitespace-pre">Proof-of-Play Analytics</p>
      </div>
    </div>
  );
}

function Button29() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[72px] items-center left-0 px-[16px] py-0 rounded-[10px] top-0" data-name="Button">
      <Icon28 />
      <Text16 />
    </div>
  );
}

function ListItem4() {
  return (
    <div className="h-[72px] relative shrink-0 w-full" data-name="List Item">
      <Button29 />
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p16dd5f0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M1.66667 8.33333H18.3333" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">{`Budget & Billing`}</p>
      </div>
    </div>
  );
}

function Button30() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[48px] items-center left-0 px-[16px] py-0 rounded-[10px] top-0 w-[207px]" data-name="Button">
      <Icon29 />
      <Text17 />
    </div>
  );
}

function ListItem5() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button30 />
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pcfbcf00} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.pd2076c0} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 7.5H6.66667" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 10.8333H6.66667" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 14.1667H6.66667" id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">{`Reports & Insights`}</p>
      </div>
    </div>
  );
}

function Button31() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[48px] items-center left-0 px-[16px] py-0 rounded-[10px] top-0 w-[207px]" data-name="Button">
      <Icon30 />
      <Text18 />
    </div>
  );
}

function ListItem6() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button31 />
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p15ab6200} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3b27f100} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="basis-0 grow h-[24px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">{`Account & Settings`}</p>
      </div>
    </div>
  );
}

function Button32() {
  return (
    <div className="absolute box-border content-stretch flex gap-[12px] h-[48px] items-center left-0 px-[16px] py-0 rounded-[10px] top-0 w-[207px]" data-name="Button">
      <Icon31 />
      <Text19 />
    </div>
  );
}

function ListItem7() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="List Item">
      <Button32 />
    </div>
  );
}

function List() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="List">
      <ListItem />
      <SlotClone />
      <SlotClone1 />
      <ListItem1 />
      <Button26 />
      <ListItem2 />
      <ListItem3 />
      <ListItem4 />
      <ListItem5 />
      <ListItem6 />
      <ListItem7 />
    </div>
  );
}

function Navigation() {
  return (
    <div className="relative shrink-0 w-full" data-name="Navigation">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] items-start pb-0 pt-[16px] px-[16px] relative w-full">
          <Button23 />
          <List />
        </div>
      </div>
    </div>
  );
}

function UserInfo() {
  return (
    <div className="basis-0 content-stretch flex flex-col grow items-start min-h-px min-w-px relative shrink-0 w-full" data-name="User Info">
      <Container16 />
      <Navigation />
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[18.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[20px] relative w-[18.984px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-nowrap text-white top-0 whitespace-pre">RK</p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="bg-gradient-to-b from-[#007aff] relative rounded-[3.35544e+07px] shrink-0 size-[40px] to-[#0051d5]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-[40px]">
        <Text20 />
      </div>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 whitespace-pre">Sarah Khan</p>
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-gray-500">Digital Agency Pro</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[36px] items-start relative w-full">
        <Paragraph12 />
        <Paragraph13 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[64px] relative rounded-[12px] shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex gap-[12px] h-[64px] items-center px-[12px] py-0 relative w-full">
          <Container17 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function Icon32() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[10px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p7556770} id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 8H6" id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p12257fa0} id="Vector_3" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button33() {
  return (
    <div className="h-[36px] relative rounded-[8px] shrink-0 w-full" data-name="Button">
      <Icon32 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-[40px] not-italic text-[14px] text-nowrap text-red-600 top-[8px] whitespace-pre">Sign Out</p>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[141px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[141px] items-start pb-0 pt-[17px] px-[16px] relative w-full">
          <Container19 />
          <Button33 />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[1024px] items-start justify-between left-0 pl-0 pr-px py-0 top-0 w-[273px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[0px_1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <UserInfo />
      <Container20 />
    </div>
  );
}

export default function Campaign() {
  return (
    <div className="bg-[#f5f7fa] relative size-full" data-name="Campaign">
      <TopNav />
      <Sidebar />
      <Container1 />
      <Container5 />
      <Container10 />
    </div>
  );
}