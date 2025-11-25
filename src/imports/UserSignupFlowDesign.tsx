import svgPaths from "./svg-4b9tpaweeu";

function Icon() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.p1b8b3180} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="bg-[#d9480f] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex h-[24px] items-start relative shrink-0 w-full" data-name="Heading 1">
      <p className="basis-0 font-['Inter:Semi_Bold',sans-serif] font-semibold grow leading-[24px] min-h-px min-w-px not-italic relative shrink-0 text-[20px] text-gray-900 tracking-[-0.4492px]">DOOH Platform</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[12px] text-gray-500 text-nowrap whitespace-pre">{`Campaign & Content Management`}</p>
    </div>
  );
}

function Container1() {
  return (
    <div className="basis-0 grow h-[40px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[40px] items-start relative w-full">
        <Heading />
        <Paragraph />
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[40px] relative shrink-0 w-[246.281px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[40px] items-center relative w-[246.281px]">
        <Container />
        <Container1 />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-[25px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 8H2" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 4H2" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12H2" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p324c04f0} id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-[143.078px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[143.078px]">
        <Icon1 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.857px] left-[88.5px] not-italic text-[16px] text-center text-neutral-950 text-nowrap top-[10.58px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Playlists</p>
      </div>
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[24px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="basis-0 bg-[#d9480f] grow h-[44px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-full">
        <Icon2 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.857px] left-[113px] not-italic text-[16px] text-center text-nowrap text-white top-[10.58px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">New Campaign</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="h-[44px] relative shrink-0 w-[349.5px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[44px] items-center relative w-[349.5px]">
        <Button />
        <Button1 />
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex h-[44px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-white h-[77px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[77px] items-start pb-px pt-[16px] px-[118px] relative w-full">
          <Container4 />
        </div>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="absolute left-[25px] size-[16px] top-[20.42px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3783f000} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f8d1b80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton() {
  return (
    <div className="basis-0 grow h-[57.844px] min-h-px min-w-px relative shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[1px_1px_2px] border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[57.844px] relative w-full">
        <Icon3 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.857px] left-[98.5px] not-italic text-[16px] text-center text-neutral-950 text-nowrap top-[17px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Campaigns</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="absolute left-[25px] size-[16px] top-[20.42px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 8H2" id="Vector" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M10.6667 4H2" id="Vector_2" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12H2" id="Vector_3" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p324c04f0} id="Vector_4" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton1() {
  return (
    <div className="basis-0 bg-white grow h-[57.844px] min-h-px min-w-px relative shrink-0" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border-[#d9480f] border-[1px_1px_2px] border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[57.844px] relative w-full">
        <Icon4 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.857px] left-[87px] not-italic text-[#d9480f] text-[16px] text-center text-nowrap top-[17px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Playlists</p>
      </div>
    </div>
  );
}

function PrimitiveDiv() {
  return (
    <div className="content-stretch flex h-[57.844px] items-center justify-center relative rounded-[14px] shrink-0 w-full" data-name="Primitive.div">
      <PrimitiveButton />
      <PrimitiveButton1 />
    </div>
  );
}

function App() {
  return (
    <div className="bg-white h-[58.844px] relative shrink-0 w-[1516px]" data-name="App">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[58.844px] items-start pb-px pl-[150px] pr-[1057.5px] pt-0 relative w-[1516px]">
        <PrimitiveDiv />
      </div>
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-[16px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="basis-0 grow h-[44px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-full">
        <Icon5 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.857px] left-[108px] not-italic text-[16px] text-center text-neutral-950 text-nowrap top-[10.58px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Back to Playlists</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-gray-200 h-[32px] relative shrink-0 w-px" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[32px] w-px" />
    </div>
  );
}

function Heading1() {
  return (
    <div className="basis-0 grow h-[30px] min-h-px min-w-px relative shrink-0" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[30px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[30px] left-0 not-italic text-[20px] text-gray-900 text-nowrap top-0 tracking-[-0.4492px] whitespace-pre">Edit Playlist</p>
      </div>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[rgba(22,163,74,0.08)] h-[20.656px] relative rounded-[8px] shrink-0 w-[52.25px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20.656px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[52.25px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14.667px] not-italic relative shrink-0 text-[11px] text-green-600 text-nowrap tracking-[0.0645px] whitespace-pre">Active</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[12px] h-[30px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <Badge />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="basis-0 font-['Inter:Regular',sans-serif] font-normal grow leading-[16px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-green-600">✓ All checks passed</p>
    </div>
  );
}

function Container8() {
  return (
    <div className="h-[46px] relative shrink-0 w-[170.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col h-[46px] items-start relative w-[170.609px]">
        <Container7 />
        <Paragraph1 />
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[46px] relative shrink-0 w-[388.375px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[46px] items-center relative w-[388.375px]">
        <Button2 />
        <Container6 />
        <Container8 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[25px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p26b72c80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-[140.547px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[140.547px]">
        <Icon6 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.857px] left-[86.5px] not-italic text-[16px] text-center text-neutral-950 text-nowrap top-[10.58px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Preview</p>
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="absolute left-[25px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p3c401780} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56b0600} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p17caa400} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="basis-0 bg-white grow h-[44px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-full">
        <Icon7 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.857px] left-[96px] not-italic text-[16px] text-center text-neutral-950 text-nowrap top-[10.58px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Save Draft</p>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-[24px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2ee8cc00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#d9480f] h-[44px] relative rounded-[8px] shrink-0 w-[135.5px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[135.5px]">
        <Icon8 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.857px] left-[84.5px] not-italic text-[16px] text-center text-nowrap text-white top-[10.58px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Update</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[44px] relative shrink-0 w-[459.516px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[12px] h-[44px] items-center relative w-[459.516px]">
        <Button3 />
        <Button4 />
        <Button5 />
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[46px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute bg-white box-border content-stretch flex flex-col h-[79px] items-start left-0 pb-px pt-[16px] px-[38px] top-0 w-[1516px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container11 />
    </div>
  );
}

function EnhancedPlaylistEditor() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="EnhancedPlaylistEditor">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">Playlist Details</p>
    </div>
  );
}

function PrimitiveLabel() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Playlist Name *</p>
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f3f3f5] h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[44px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Diwali Festival Campaign</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[66px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel />
      <Input />
    </div>
  );
}

function PrimitiveLabel1() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Description (Optional)</p>
    </div>
  );
}

function Textarea() {
  return (
    <div className="bg-[#f3f3f5] h-[64px] relative rounded-[8px] shrink-0 w-full" data-name="Textarea">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="box-border content-stretch flex h-[64px] items-start px-[12px] py-[8px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[22.857px] not-italic relative shrink-0 text-[#717182] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Add a description for this playlist</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[86px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel1 />
      <Textarea />
    </div>
  );
}

function PrimitiveLabel2() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Tags</p>
    </div>
  );
}

function Input1() {
  return (
    <div className="basis-0 bg-[#f3f3f5] grow h-[44px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[44px] items-center px-[12px] py-[4px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Add a tag</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M3.33333 8H12.6667" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 3.33333V12.6667" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-[66px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[44px] items-center justify-center p-px relative w-[66px]">
        <Icon9 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[44px] items-center relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Button6 />
    </div>
  );
}

function Icon10() {
  return (
    <div className="absolute left-[60.77px] size-[12px] top-[9px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M9 3L3 9" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 3L9 9" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="absolute bg-gray-50 h-[30px] left-0 rounded-[8px] top-0 w-[85.766px]" data-name="Badge">
      <div className="h-[30px] overflow-clip relative rounded-[inherit] w-[85.766px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[13px] not-italic text-[12px] text-gray-900 text-nowrap top-[7px] whitespace-pre">festival</p>
        <Icon10 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon11() {
  return (
    <div className="absolute left-[70.02px] size-[12px] top-[9px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M9 3L3 9" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 3L9 9" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Badge2() {
  return (
    <div className="absolute bg-gray-50 h-[30px] left-[93.77px] rounded-[8px] top-0 w-[95.016px]" data-name="Badge">
      <div className="h-[30px] overflow-clip relative rounded-[inherit] w-[95.016px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16px] left-[13px] not-italic text-[12px] text-gray-900 text-nowrap top-[7px] whitespace-pre">seasonal</p>
        <Icon11 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Container">
      <Badge1 />
      <Badge2 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[108px] items-start relative shrink-0 w-full" data-name="Container">
      <PrimitiveLabel2 />
      <Container15 />
      <Container16 />
    </div>
  );
}

function EnhancedPlaylistEditor1() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[308px] items-start relative shrink-0 w-full" data-name="EnhancedPlaylistEditor">
      <Container13 />
      <Container14 />
      <Container17 />
    </div>
  );
}

function Container18() {
  return (
    <div className="bg-white h-[409px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[409px] items-start pb-px pt-[25px] px-[25px] relative w-full">
          <EnhancedPlaylistEditor />
          <EnhancedPlaylistEditor1 />
        </div>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-0 size-[20px] top-[3.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p262abc00} id="Vector" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
      <Icon12 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-[28px] not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">Timeline</p>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-gray-500 top-0 tracking-[-0.1504px] w-[125px]">5 items • 0:53 total</p>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[52px] relative shrink-0 w-[124.234px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[52px] items-start relative w-[124.234px]">
        <Heading2 />
        <Paragraph2 />
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p26b72c80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="basis-0 bg-white grow h-[40px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-full">
        <Icon13 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[73.5px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[10px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Preview</p>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-[17px] size-[16px] top-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8.66667 11.3333V3.33333" id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 11.3333V9.33333" id="Vector_4" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-white h-[40px] relative rounded-[8px] shrink-0 w-[98.313px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[40px] relative w-[98.313px]">
        <Icon14 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[64.5px] not-italic text-[14px] text-center text-neutral-950 text-nowrap top-[10px] tracking-[-0.1504px] translate-x-[-50%] whitespace-pre">Stats</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[40px] relative shrink-0 w-[222.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[40px] items-center relative w-[222.406px]">
        <Button7 />
        <Button8 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex h-[52px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Text() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[75.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[75.297px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Total Duration</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27252)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 4V8L10.6667 9.33333" id="Vector_2" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27252">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text />
      <Icon15 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">0:53</p>
    </div>
  );
}

function Container23() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex flex-col gap-[4px] h-[73.5px] items-start left-0 pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[205.828px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container22 />
      <Paragraph3 />
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[38.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[38.672px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Images</p>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2fe1fe40} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p25c2200} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text1 />
      <Icon16 />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">3</p>
    </div>
  );
}

function Container25() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex flex-col gap-[4px] h-[73.5px] items-start left-[217.83px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[205.828px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container24 />
      <Paragraph4 />
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[36.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[36.641px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Videos</p>
      </div>
    </div>
  );
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d08dd80} id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e94b080} id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text2 />
      <Icon17 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">2</p>
    </div>
  );
}

function Container27() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex flex-col gap-[4px] h-[73.5px] items-start left-[435.66px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[205.828px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container26 />
      <Paragraph5 />
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[68.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[68.844px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Avg Duration</p>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27182)" id="Icon">
          <path d={svgPaths.p319d7580} id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M13.3333 2V4.66667" id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14.6667 3.33333H12" id="Vector_3" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M2.66667 11.3333V12.6667" id="Vector_4" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M3.33333 12H2" id="Vector_5" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27182">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text3 />
      <Icon18 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[27px] left-0 not-italic text-[18px] text-gray-900 top-px tracking-[-0.4395px] w-[47px]">10.6s</p>
    </div>
  );
}

function Container29() {
  return (
    <div className="absolute bg-gray-50 box-border content-stretch flex flex-col gap-[4px] h-[73.5px] items-start left-[653.48px] pb-px pt-[13px] px-[13px] rounded-[10px] top-0 w-[205.844px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container28 />
      <Paragraph6 />
    </div>
  );
}

function Container30() {
  return (
    <div className="h-[73.5px] relative shrink-0 w-full" data-name="Container">
      <Container23 />
      <Container25 />
      <Container27 />
      <Container29 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon19 />
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[24px] relative shrink-0 w-[7.875px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[7.875px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">1</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="bg-gray-50 relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Text4 />
      </div>
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p23b62300} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p27c8d3f0} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p14f4b400} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[rgba(22,163,74,0.08)] relative rounded-[10px] shrink-0 size-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[64px]">
        <Icon20 />
      </div>
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[120.922px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.5px] overflow-clip relative rounded-[inherit] w-[120.922px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[15px] text-gray-900 text-nowrap top-[-1px] tracking-[-0.2344px] whitespace-pre">Festival Banner 1</p>
      </div>
    </div>
  );
}

function Badge3() {
  return (
    <div className="bg-[rgba(22,163,74,0.08)] h-[19.328px] relative rounded-[8px] shrink-0 w-[51.063px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[19.328px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[51.063px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] not-italic relative shrink-0 text-[10px] text-green-600 text-nowrap tracking-[0.1172px] uppercase whitespace-pre">image</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Badge3 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[69px]">Duration: 5s</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="h-[18px] relative shrink-0 w-[84.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[84.969px]">
        <Icon21 />
        <Text5 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 1.5L10 6L3 10.5V1.5Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[80px]">Position 1 of 5</p>
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[18px] relative shrink-0 w-[95.766px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[95.766px]">
        <Icon22 />
        <Text6 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Container34 />
      <Container35 />
    </div>
  );
}

function Container37() {
  return (
    <div className="basis-0 grow h-[48.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[48.5px] items-start relative w-full">
        <Container33 />
        <Container36 />
      </div>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[100px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[100px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Duration</p>
      </div>
    </div>
  );
}

function Input2() {
  return (
    <div className="bg-[#f3f3f5] h-[40px] relative rounded-[8px] shrink-0 w-[70px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[70px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">5</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[20.25px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">sec</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-full items-center relative w-[100px]">
        <Input2 />
        <Text7 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[60.5px] relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[60.5px] items-start relative w-[100px]">
        <Label />
        <Container38 />
      </div>
    </div>
  );
}

function Icon23() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27225)" id="Icon">
          <path d={svgPaths.p216f800} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13e4b3c0} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27225">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button10() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon23 />
      </div>
    </div>
  );
}

function Icon24() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-full">
        <Icon24 />
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="h-[36px] relative shrink-0 w-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[36px] items-center relative w-[76px]">
        <Button10 />
        <Button11 />
      </div>
    </div>
  );
}

function TimelineItem() {
  return (
    <div className="content-stretch flex gap-[16px] h-[64px] items-center relative shrink-0 w-full" data-name="TimelineItem">
      <Button9 />
      <Container31 />
      <Container32 />
      <Container37 />
      <Container39 />
      <Container40 />
    </div>
  );
}

function Icon25() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[94.328px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Timeline Duration</p>
      </div>
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon25 />
      <Text8 />
    </div>
  );
}

function Container42() {
  return <div className="bg-green-600 h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container43() {
  return (
    <div className="bg-gray-50 h-[8px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start pl-0 pr-[754.719px] py-0 relative w-full">
          <Container42 />
        </div>
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[11.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">0s</p>
      </div>
    </div>
  );
}

function Text10() {
  return (
    <div className="h-[15px] relative shrink-0 w-[18.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[18.266px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">60s</p>
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text9 />
      <Text10 />
    </div>
  );
}

function TimelineItem1() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[64.5px] items-start pb-0 pt-[13px] px-0 relative shrink-0 w-full" data-name="TimelineItem">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container41 />
      <Container43 />
      <Container44 />
    </div>
  );
}

function Container45() {
  return (
    <div className="h-[176.5px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[176.5px] items-start pb-[2px] pt-[18px] px-[18px] relative w-full">
          <TimelineItem />
          <TimelineItem1 />
        </div>
      </div>
    </div>
  );
}

function Icon26() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon26 />
      </div>
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[24px] relative shrink-0 w-[9.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[9.984px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Container46() {
  return (
    <div className="bg-gray-50 relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-[48px]">
        <Text11 />
      </div>
    </div>
  );
}

function Icon27() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p3658cf80} id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2fa22180} id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container47() {
  return (
    <div className="bg-[rgba(255,89,0,0.08)] relative rounded-[10px] shrink-0 size-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[64px]">
        <Icon27 />
      </div>
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[133.375px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.5px] overflow-clip relative rounded-[inherit] w-[133.375px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[15px] text-gray-900 text-nowrap top-[-1px] tracking-[-0.2344px] whitespace-pre">Product Showcase</p>
      </div>
    </div>
  );
}

function Badge4() {
  return (
    <div className="bg-[rgba(255,89,0,0.08)] h-[19.328px] relative rounded-[8px] shrink-0 w-[50.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[19.328px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[50.016px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] not-italic relative shrink-0 text-[#ff5900] text-[10px] text-nowrap tracking-[0.1172px] uppercase whitespace-pre">video</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container48() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Badge4 />
    </div>
  );
}

function Icon28() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[75px]">Duration: 15s</p>
      </div>
    </div>
  );
}

function Container49() {
  return (
    <div className="h-[18px] relative shrink-0 w-[90.531px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[90.531px]">
        <Icon28 />
        <Text12 />
      </div>
    </div>
  );
}

function Icon29() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 1.5L10 6L3 10.5V1.5Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text13() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[82px]">Position 2 of 5</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="h-[18px] relative shrink-0 w-[97.438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[97.438px]">
        <Icon29 />
        <Text13 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container52() {
  return (
    <div className="basis-0 grow h-[48.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[48.5px] items-start relative w-full">
        <Container48 />
        <Container51 />
      </div>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[100px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[100px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Duration</p>
      </div>
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f3f3f5] h-[40px] relative rounded-[8px] shrink-0 w-[70px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[70px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">15</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[20.25px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">sec</p>
      </div>
    </div>
  );
}

function Container53() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-full items-center relative w-[100px]">
        <Input3 />
        <Text14 />
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="h-[60.5px] relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[60.5px] items-start relative w-[100px]">
        <Label1 />
        <Container53 />
      </div>
    </div>
  );
}

function Icon30() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27225)" id="Icon">
          <path d={svgPaths.p216f800} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13e4b3c0} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27225">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon30 />
      </div>
    </div>
  );
}

function Icon31() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-full">
        <Icon31 />
      </div>
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[36px] relative shrink-0 w-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[36px] items-center relative w-[76px]">
        <Button13 />
        <Button14 />
      </div>
    </div>
  );
}

function TimelineItem2() {
  return (
    <div className="content-stretch flex gap-[16px] h-[64px] items-center relative shrink-0 w-full" data-name="TimelineItem">
      <Button12 />
      <Container46 />
      <Container47 />
      <Container52 />
      <Container54 />
      <Container55 />
    </div>
  );
}

function Icon32() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[94.328px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Timeline Duration</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon32 />
      <Text15 />
    </div>
  );
}

function Container57() {
  return <div className="bg-[#ff5900] h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container58() {
  return (
    <div className="bg-gray-50 h-[8px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start pl-0 pr-[617.5px] py-0 relative w-full">
          <Container57 />
        </div>
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[11.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">0s</p>
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[15px] relative shrink-0 w-[18.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[18.266px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">60s</p>
      </div>
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text16 />
      <Text17 />
    </div>
  );
}

function TimelineItem3() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[64.5px] items-start pb-0 pt-[13px] px-0 relative shrink-0 w-full" data-name="TimelineItem">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container56 />
      <Container58 />
      <Container59 />
    </div>
  );
}

function Container60() {
  return (
    <div className="h-[176.5px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[176.5px] items-start pb-[2px] pt-[18px] px-[18px] relative w-full">
          <TimelineItem2 />
          <TimelineItem3 />
        </div>
      </div>
    </div>
  );
}

function Icon33() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon33 />
      </div>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[10.391px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[10.391px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="bg-gray-50 relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center pl-0 pr-[0.016px] py-0 relative size-[48px]">
        <Text18 />
      </div>
    </div>
  );
}

function Icon34() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p23b62300} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p27c8d3f0} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p375e5680} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container62() {
  return (
    <div className="bg-[rgba(22,163,74,0.08)] relative rounded-[10px] shrink-0 size-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[64px]">
        <Icon34 />
      </div>
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[104.719px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.5px] overflow-clip relative rounded-[inherit] w-[104.719px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[15px] text-gray-900 text-nowrap top-[-1px] tracking-[-0.2344px] whitespace-pre">Discount Offer</p>
      </div>
    </div>
  );
}

function Badge5() {
  return (
    <div className="bg-[rgba(22,163,74,0.08)] h-[19.328px] relative rounded-[8px] shrink-0 w-[51.063px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[19.328px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[51.063px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] not-italic relative shrink-0 text-[10px] text-green-600 text-nowrap tracking-[0.1172px] uppercase whitespace-pre">image</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Badge5 />
    </div>
  );
}

function Icon35() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[70px]">Duration: 8s</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="h-[18px] relative shrink-0 w-[85.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[85.219px]">
        <Icon35 />
        <Text19 />
      </div>
    </div>
  );
}

function Icon36() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 1.5L10 6L3 10.5V1.5Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[82px]">Position 3 of 5</p>
      </div>
    </div>
  );
}

function Container65() {
  return (
    <div className="h-[18px] relative shrink-0 w-[97.719px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[97.719px]">
        <Icon36 />
        <Text20 />
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Container64 />
      <Container65 />
    </div>
  );
}

function Container67() {
  return (
    <div className="basis-0 grow h-[48.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[48.5px] items-start relative w-full">
        <Container63 />
        <Container66 />
      </div>
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[100px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[100px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Duration</p>
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#f3f3f5] h-[40px] relative rounded-[8px] shrink-0 w-[70px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[70px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">8</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[20.25px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">sec</p>
      </div>
    </div>
  );
}

function Container68() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-full items-center relative w-[100px]">
        <Input4 />
        <Text21 />
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="h-[60.5px] relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[60.5px] items-start relative w-[100px]">
        <Label2 />
        <Container68 />
      </div>
    </div>
  );
}

function Icon37() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27225)" id="Icon">
          <path d={svgPaths.p216f800} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13e4b3c0} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27225">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button16() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon37 />
      </div>
    </div>
  );
}

function Icon38() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button17() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-full">
        <Icon38 />
      </div>
    </div>
  );
}

function Container70() {
  return (
    <div className="h-[36px] relative shrink-0 w-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[36px] items-center relative w-[76px]">
        <Button16 />
        <Button17 />
      </div>
    </div>
  );
}

function TimelineItem4() {
  return (
    <div className="content-stretch flex gap-[16px] h-[64px] items-center relative shrink-0 w-full" data-name="TimelineItem">
      <Button15 />
      <Container61 />
      <Container62 />
      <Container67 />
      <Container69 />
      <Container70 />
    </div>
  );
}

function Icon39() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[94.328px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Timeline Duration</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon39 />
      <Text22 />
    </div>
  );
}

function Container72() {
  return <div className="bg-green-600 h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container73() {
  return (
    <div className="bg-gray-50 h-[8px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start pl-0 pr-[713.563px] py-0 relative w-full">
          <Container72 />
        </div>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[11.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">0s</p>
      </div>
    </div>
  );
}

function Text24() {
  return (
    <div className="h-[15px] relative shrink-0 w-[18.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[18.266px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">60s</p>
      </div>
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text23 />
      <Text24 />
    </div>
  );
}

function TimelineItem5() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[64.5px] items-start pb-0 pt-[13px] px-0 relative shrink-0 w-full" data-name="TimelineItem">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container71 />
      <Container73 />
      <Container74 />
    </div>
  );
}

function Container75() {
  return (
    <div className="h-[176.5px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[176.5px] items-start pb-[2px] pt-[18px] px-[18px] relative w-full">
          <TimelineItem4 />
          <TimelineItem5 />
        </div>
      </div>
    </div>
  );
}

function Icon40() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon40 />
      </div>
    </div>
  );
}

function Text25() {
  return (
    <div className="h-[24px] relative shrink-0 w-[10.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[10.688px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-gray-500 text-nowrap top-0 tracking-[-0.3125px] whitespace-pre">4</p>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="bg-gray-50 relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Text25 />
      </div>
    </div>
  );
}

function Icon41() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p3658cf80} id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p2fa22180} id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container77() {
  return (
    <div className="bg-[rgba(255,89,0,0.08)] relative rounded-[10px] shrink-0 size-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[64px]">
        <Icon41 />
      </div>
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[85.234px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.5px] overflow-clip relative rounded-[inherit] w-[85.234px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[15px] text-gray-900 text-nowrap top-[-1px] tracking-[-0.2344px] whitespace-pre">Brand Story</p>
      </div>
    </div>
  );
}

function Badge6() {
  return (
    <div className="bg-[rgba(255,89,0,0.08)] h-[19.328px] relative rounded-[8px] shrink-0 w-[50.016px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[19.328px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[50.016px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] not-italic relative shrink-0 text-[#ff5900] text-[10px] text-nowrap tracking-[0.1172px] uppercase whitespace-pre">video</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading6 />
      <Badge6 />
    </div>
  );
}

function Icon42() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text26() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[77px]">Duration: 20s</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="h-[18px] relative shrink-0 w-[92.359px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[92.359px]">
        <Icon42 />
        <Text26 />
      </div>
    </div>
  );
}

function Icon43() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 1.5L10 6L3 10.5V1.5Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text27() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[82px]">Position 4 of 5</p>
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="h-[18px] relative shrink-0 w-[97.922px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[97.922px]">
        <Icon43 />
        <Text27 />
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Container79 />
      <Container80 />
    </div>
  );
}

function Container82() {
  return (
    <div className="basis-0 grow h-[48.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[48.5px] items-start relative w-full">
        <Container78 />
        <Container81 />
      </div>
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[100px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[100px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Duration</p>
      </div>
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[#f3f3f5] h-[40px] relative rounded-[8px] shrink-0 w-[70px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[70px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">20</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text28() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[20.25px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">sec</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-full items-center relative w-[100px]">
        <Input5 />
        <Text28 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="h-[60.5px] relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[60.5px] items-start relative w-[100px]">
        <Label3 />
        <Container83 />
      </div>
    </div>
  );
}

function Icon44() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27225)" id="Icon">
          <path d={svgPaths.p216f800} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13e4b3c0} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27225">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button19() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon44 />
      </div>
    </div>
  );
}

function Icon45() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button20() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-full">
        <Icon45 />
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="h-[36px] relative shrink-0 w-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[36px] items-center relative w-[76px]">
        <Button19 />
        <Button20 />
      </div>
    </div>
  );
}

function TimelineItem6() {
  return (
    <div className="content-stretch flex gap-[16px] h-[64px] items-center relative shrink-0 w-full" data-name="TimelineItem">
      <Button18 />
      <Container76 />
      <Container77 />
      <Container82 />
      <Container84 />
      <Container85 />
    </div>
  );
}

function Icon46() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text29() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[94.328px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Timeline Duration</p>
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon46 />
      <Text29 />
    </div>
  );
}

function Container87() {
  return <div className="bg-[#ff5900] h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container88() {
  return (
    <div className="bg-gray-50 h-[8px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start pl-0 pr-[548.891px] py-0 relative w-full">
          <Container87 />
        </div>
      </div>
    </div>
  );
}

function Text30() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[11.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">0s</p>
      </div>
    </div>
  );
}

function Text31() {
  return (
    <div className="h-[15px] relative shrink-0 w-[18.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[18.266px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">60s</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text30 />
      <Text31 />
    </div>
  );
}

function TimelineItem7() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[64.5px] items-start pb-0 pt-[13px] px-0 relative shrink-0 w-full" data-name="TimelineItem">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container86 />
      <Container88 />
      <Container89 />
    </div>
  );
}

function Container90() {
  return (
    <div className="h-[176.5px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[176.5px] items-start pb-[2px] pt-[18px] px-[18px] relative w-full">
          <TimelineItem6 />
          <TimelineItem7 />
        </div>
      </div>
    </div>
  );
}

function Icon47() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[45.83%_58.33%_45.83%_33.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[33.33%] right-[58.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[33.33%] right-[58.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[45.83%_33.33%_45.83%_58.33%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[58.33%] right-[33.33%] top-[16.67%]" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[16.67%] left-[58.33%] right-[33.33%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-50%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 4 4">
            <path d={svgPaths.p3815c300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col items-start relative size-[20px]">
        <Icon47 />
      </div>
    </div>
  );
}

function Text32() {
  return (
    <div className="h-[24px] relative shrink-0 w-[10.313px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[24px] relative w-[10.313px]">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[24px] left-0 not-italic text-[16px] text-nowrap text-white top-0 tracking-[-0.3125px] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="bg-[#d9480f] relative rounded-[10px] shrink-0 size-[48px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[48px]">
        <Text32 />
      </div>
    </div>
  );
}

function Icon48() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p23b62300} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p27c8d3f0} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p375e5680} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container92() {
  return (
    <div className="bg-[rgba(22,163,74,0.08)] relative rounded-[10px] shrink-0 size-[64px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[64px]">
        <Icon48 />
      </div>
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[122.938px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[22.5px] overflow-clip relative rounded-[inherit] w-[122.938px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[15px] text-gray-900 text-nowrap top-[-1px] tracking-[-0.2344px] whitespace-pre">Festival Banner 2</p>
      </div>
    </div>
  );
}

function Badge7() {
  return (
    <div className="bg-[rgba(22,163,74,0.08)] h-[19.328px] relative rounded-[8px] shrink-0 w-[51.063px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[19.328px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[51.063px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.333px] not-italic relative shrink-0 text-[10px] text-green-600 text-nowrap tracking-[0.1172px] uppercase whitespace-pre">image</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Badge7 />
    </div>
  );
}

function Icon49() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text33() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[69px]">Duration: 5s</p>
      </div>
    </div>
  );
}

function Container94() {
  return (
    <div className="h-[18px] relative shrink-0 w-[84.969px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[84.969px]">
        <Icon49 />
        <Text33 />
      </div>
    </div>
  );
}

function Icon50() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d="M3 1.5L10 6L3 10.5V1.5Z" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text34() {
  return (
    <div className="basis-0 grow h-[18px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[82px]">Position 5 of 5</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="h-[18px] relative shrink-0 w-[97.609px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[18px] items-center relative w-[97.609px]">
        <Icon50 />
        <Text34 />
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="content-stretch flex gap-[12px] h-[18px] items-center relative shrink-0 w-full" data-name="Container">
      <Container94 />
      <Container95 />
    </div>
  );
}

function Container97() {
  return (
    <div className="basis-0 grow h-[48.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[8px] h-[48.5px] items-start relative w-full">
        <Container93 />
        <Container96 />
      </div>
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[100px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[100px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Duration</p>
      </div>
    </div>
  );
}

function Input6() {
  return (
    <div className="bg-[#f3f3f5] h-[40px] relative rounded-[8px] shrink-0 w-[70px]" data-name="Input">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[40px] items-center overflow-clip px-[12px] py-[4px] relative rounded-[inherit] w-[70px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">5</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Text35() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20.25px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[20.25px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-0 not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">sec</p>
      </div>
    </div>
  );
}

function Container98() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-full items-center relative w-[100px]">
        <Input6 />
        <Text35 />
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="h-[60.5px] relative shrink-0 w-[100px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[60.5px] items-start relative w-[100px]">
        <Label4 />
        <Container98 />
      </div>
    </div>
  );
}

function Icon51() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27225)" id="Icon">
          <path d={svgPaths.p216f800} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p13e4b3c0} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27225">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button22() {
  return (
    <div className="relative rounded-[8px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[36px]">
        <Icon51 />
      </div>
    </div>
  );
}

function Icon52() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M2 4H14" id="Vector" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p64eb800} id="Vector_2" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p56ef700} id="Vector_3" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M6.66667 7.33333V11.3333" id="Vector_4" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 7.33333V11.3333" id="Vector_5" stroke="var(--stroke-0, #DC2626)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button23() {
  return (
    <div className="basis-0 grow h-[36px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[36px] items-center justify-center relative w-full">
        <Icon52 />
      </div>
    </div>
  );
}

function Container100() {
  return (
    <div className="h-[36px] relative shrink-0 w-[76px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[36px] items-center relative w-[76px]">
        <Button22 />
        <Button23 />
      </div>
    </div>
  );
}

function TimelineItem8() {
  return (
    <div className="content-stretch flex gap-[16px] h-[64px] items-center relative shrink-0 w-full" data-name="TimelineItem">
      <Button21 />
      <Container91 />
      <Container92 />
      <Container97 />
      <Container99 />
      <Container100 />
    </div>
  );
}

function Icon53() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_171_27173)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 3V6L8 7" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_171_27173">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text36() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[94.328px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[94.328px]">
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Timeline Duration</p>
      </div>
    </div>
  );
}

function Container101() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon53 />
      <Text36 />
    </div>
  );
}

function Container102() {
  return <div className="bg-green-600 h-[8px] rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container" />;
}

function Container103() {
  return (
    <div className="bg-gray-50 h-[8px] relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[8px] items-start pl-0 pr-[754.719px] py-0 relative w-full">
          <Container102 />
        </div>
      </div>
    </div>
  );
}

function Text37() {
  return (
    <div className="h-[15px] relative shrink-0 w-[11.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[11.781px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">0s</p>
      </div>
    </div>
  );
}

function Text38() {
  return (
    <div className="h-[15px] relative shrink-0 w-[18.266px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[15px] relative w-[18.266px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[15px] left-0 not-italic text-[10px] text-gray-500 text-nowrap top-0 tracking-[0.1172px] whitespace-pre">60s</p>
      </div>
    </div>
  );
}

function Container104() {
  return (
    <div className="content-stretch flex h-[15px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text37 />
      <Text38 />
    </div>
  );
}

function TimelineItem9() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[64.5px] items-start pb-0 pt-[13px] px-0 relative shrink-0 w-full" data-name="TimelineItem">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container101 />
      <Container103 />
      <Container104 />
    </div>
  );
}

function Container105() {
  return (
    <div className="bg-[rgba(217,72,15,0.05)] h-[176.5px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d9480f] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[12px] h-[176.5px] items-start pb-[2px] pt-[18px] px-[18px] relative w-full">
          <TimelineItem8 />
          <TimelineItem9 />
        </div>
      </div>
    </div>
  );
}

function Container106() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[930.5px] items-start relative shrink-0 w-full" data-name="Container">
      <Container45 />
      <Container60 />
      <Container75 />
      <Container90 />
      <Container105 />
    </div>
  );
}

function Icon54() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p90824c0} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12 11.3333V6" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8.66667 11.3333V3.33333" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M5.33333 11.3333V9.33333" id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Heading8() {
  return (
    <div className="basis-0 grow h-[21px] min-h-px min-w-px relative shrink-0" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Timeline Overview</p>
      </div>
    </div>
  );
}

function Container107() {
  return (
    <div className="h-[21px] relative shrink-0 w-[147.984px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[21px] items-center relative w-[147.984px]">
        <Icon54 />
        <Heading8 />
      </div>
    </div>
  );
}

function Text39() {
  return (
    <div className="h-[18px] relative shrink-0 w-[60.75px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[60.75px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[61px]">Total: 0:53</p>
      </div>
    </div>
  );
}

function Container108() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container107 />
      <Text39 />
    </div>
  );
}

function SlotClone() {
  return (
    <div className="absolute bg-green-600 h-[32px] left-0 top-0 w-[81.063px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[0px_2px_0px_0px] border-solid border-white inset-0 pointer-events-none" />
    </div>
  );
}

function SlotClone1() {
  return (
    <div className="absolute bg-[#ff5900] h-[32px] left-[81.06px] top-0 w-[243.203px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[0px_2px_0px_0px] border-solid border-white inset-0 pointer-events-none" />
    </div>
  );
}

function SlotClone2() {
  return (
    <div className="absolute bg-green-600 h-[32px] left-[324.27px] top-0 w-[129.703px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[0px_2px_0px_0px] border-solid border-white inset-0 pointer-events-none" />
    </div>
  );
}

function SlotClone3() {
  return (
    <div className="absolute bg-[#ff5900] h-[32px] left-[453.98px] top-0 w-[324.266px]" data-name="SlotClone">
      <div aria-hidden="true" className="absolute border-[0px_2px_0px_0px] border-solid border-white inset-0 pointer-events-none" />
    </div>
  );
}

function SlotClone4() {
  return <div className="absolute bg-green-600 h-[32px] left-[778.25px] top-0 w-[81.063px]" data-name="SlotClone" />;
}

function Container109() {
  return (
    <div className="bg-gray-50 h-[32px] overflow-clip relative rounded-[3.35544e+07px] shrink-0 w-full" data-name="Container">
      <SlotClone />
      <SlotClone1 />
      <SlotClone2 />
      <SlotClone3 />
      <SlotClone4 />
    </div>
  );
}

function Container110() {
  return (
    <div className="bg-green-600 relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text40() {
  return (
    <div className="basis-0 grow h-[16.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 top-0 tracking-[0.0645px] w-[57px]">Images (3)</p>
      </div>
    </div>
  );
}

function Container111() {
  return (
    <div className="basis-0 grow h-[16.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[16.5px] items-center relative w-full">
        <Container110 />
        <Text40 />
      </div>
    </div>
  );
}

function Container112() {
  return (
    <div className="bg-[#ff5900] relative rounded-[4px] shrink-0 size-[12px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[12px]" />
    </div>
  );
}

function Text41() {
  return (
    <div className="basis-0 grow h-[16.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-full">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 top-0 tracking-[0.0645px] w-[55px]">Videos (2)</p>
      </div>
    </div>
  );
}

function Container113() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[72.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[6px] h-[16.5px] items-center relative w-[72.219px]">
        <Container112 />
        <Text41 />
      </div>
    </div>
  );
}

function Container114() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[162.594px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[16.5px] items-center relative w-[162.594px]">
        <Container111 />
        <Container113 />
      </div>
    </div>
  );
}

function Text42() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[160.516px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[160.516px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Click segments to select items</p>
      </div>
    </div>
  );
}

function Container115() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container114 />
      <Text42 />
    </div>
  );
}

function Container116() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[12px] h-[118.5px] items-start pb-0 pt-[25px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container108 />
      <Container109 />
      <Container115 />
    </div>
  );
}

function Icon55() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27140)" id="Icon">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 10.6667V8" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333H8.00667" id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27140">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BoldText() {
  return (
    <div className="absolute content-stretch flex h-[15px] items-start left-0 top-px w-[23.188px]" data-name="Bold Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[18px] not-italic relative shrink-0 text-[12px] text-gray-900 text-nowrap whitespace-pre">Tip:</p>
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="absolute h-[18px] left-[36px] top-[12px] w-[644.203px]" data-name="Paragraph">
      <BoldText />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-[23.19px] not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">Drag items by the grip handle to reorder. Click the duration bar overview to quickly navigate to specific items.</p>
    </div>
  );
}

function Container117() {
  return (
    <div className="bg-gray-50 h-[42px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <Icon55 />
      <Paragraph7 />
    </div>
  );
}

function PlaylistTimelineWithDnD() {
  return (
    <div className="bg-white h-[1354.5px] relative rounded-[14px] shrink-0 w-full" data-name="PlaylistTimelineWithDnD">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[1354.5px] items-start pb-px pt-[25px] px-[25px] relative w-full">
          <Container21 />
          <Container30 />
          <Container106 />
          <Container116 />
          <Container117 />
        </div>
      </div>
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="Heading 3">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">Media Library</p>
    </div>
  );
}

function BoldText1() {
  return (
    <div className="absolute content-stretch flex h-[17px] items-start left-0 top-[2px] w-[97.922px]" data-name="Bold Text">
      <p className="font-['Inter:Bold',sans-serif] font-bold leading-[21px] not-italic relative shrink-0 text-[#d9480f] text-[14px] text-nowrap tracking-[-0.1504px] whitespace-pre">Drag and drop</p>
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <BoldText1 />
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-[97.92px] not-italic text-[14px] text-gray-500 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">media items to timeline above</p>
    </div>
  );
}

function Container118() {
  return (
    <div className="h-[52px] relative shrink-0 w-[293.797px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[4px] h-[52px] items-start relative w-[293.797px]">
        <Heading9 />
        <Paragraph8 />
      </div>
    </div>
  );
}

function Icon56() {
  return (
    <div className="absolute left-[25px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M8 2V10" id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p26e09a00} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p23ad1400} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button24() {
  return (
    <div className="bg-white h-[44px] relative rounded-[8px] shrink-0 w-[184.125px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[44px] relative w-[184.125px]">
        <Icon56 />
        <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[22.857px] left-[108.5px] not-italic text-[16px] text-center text-neutral-950 text-nowrap top-[10.58px] tracking-[-0.3125px] translate-x-[-50%] whitespace-pre">Upload Media</p>
      </div>
    </div>
  );
}

function Container119() {
  return (
    <div className="absolute content-stretch flex h-[52px] items-center justify-between left-[25px] top-[25px] w-[859.328px]" data-name="Container">
      <Container118 />
      <Button24 />
    </div>
  );
}

function Icon57() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p12824f00} id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveSpan() {
  return (
    <div className="h-[20px] relative shrink-0 w-[72.156px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[72.156px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Latest First</p>
      </div>
    </div>
  );
}

function Icon58() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton2() {
  return (
    <div className="absolute bg-[#f3f3f5] box-border content-stretch flex h-[44px] items-center justify-between left-[699.33px] px-[13px] py-px rounded-[8px] top-0 w-[160px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Icon57 />
      <PrimitiveSpan />
      <Icon58 />
    </div>
  );
}

function Input7() {
  return (
    <div className="absolute bg-[#f3f3f5] h-[44px] left-0 rounded-[8px] top-0 w-[687.328px]" data-name="Input">
      <div className="box-border content-stretch flex h-[44px] items-center overflow-clip pl-[40px] pr-[12px] py-[4px] relative rounded-[inherit] w-[687.328px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#717182] text-[16px] text-nowrap tracking-[-0.3125px] whitespace-pre">Search media...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Icon59() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[14px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M14 13.9999L11.1067 11.1066" id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p107a080} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container120() {
  return (
    <div className="absolute h-[44px] left-0 top-0 w-[687.328px]" data-name="Container">
      <Input7 />
      <Icon59 />
    </div>
  );
}

function Container121() {
  return (
    <div className="absolute h-[44px] left-[25px] top-[101px] w-[859.328px]" data-name="Container">
      <PrimitiveButton2 />
      <Container120 />
    </div>
  );
}

function Icon60() {
  return (
    <div className="absolute left-0 size-[16px] top-[6px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_171_27278)" id="Icon">
          <path d={svgPaths.p9bc8e70} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p8247300} fill="var(--fill-0, #6B7280)" id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_171_27278">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button25() {
  return (
    <div className="absolute bg-gray-50 h-[28px] left-[24px] rounded-[10px] top-0 w-[65.766px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.143px] left-[33px] not-italic text-[12px] text-center text-gray-500 text-nowrap top-[5.42px] translate-x-[-50%] whitespace-pre">festival</p>
    </div>
  );
}

function Button26() {
  return (
    <div className="absolute bg-gray-50 h-[28px] left-[97.77px] rounded-[10px] top-0 w-[64.406px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.143px] left-[32.5px] not-italic text-[12px] text-center text-gray-500 text-nowrap top-[5.42px] translate-x-[-50%] whitespace-pre">banner</p>
    </div>
  );
}

function Button27() {
  return (
    <div className="absolute bg-gray-50 h-[28px] left-[170.17px] rounded-[10px] top-0 w-[69.484px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.143px] left-[35.5px] not-italic text-[12px] text-center text-gray-500 text-nowrap top-[5.42px] translate-x-[-50%] whitespace-pre">product</p>
    </div>
  );
}

function Button28() {
  return (
    <div className="absolute bg-gray-50 h-[28px] left-[247.66px] rounded-[10px] top-0 w-[81.016px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.143px] left-[41px] not-italic text-[12px] text-center text-gray-500 text-nowrap top-[5.42px] translate-x-[-50%] whitespace-pre">showcase</p>
    </div>
  );
}

function Button29() {
  return (
    <div className="absolute bg-gray-50 h-[28px] left-[336.67px] rounded-[10px] top-0 w-[51.797px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.143px] left-[26px] not-italic text-[12px] text-center text-gray-500 text-nowrap top-[5.42px] translate-x-[-50%] whitespace-pre">offer</p>
    </div>
  );
}

function Button30() {
  return (
    <div className="absolute bg-gray-50 h-[28px] left-[396.47px] rounded-[10px] top-0 w-[74.047px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.143px] left-[37px] not-italic text-[12px] text-center text-gray-500 text-nowrap top-[5.42px] translate-x-[-50%] whitespace-pre">discount</p>
    </div>
  );
}

function Button31() {
  return (
    <div className="absolute bg-gray-50 h-[28px] left-[478.52px] rounded-[10px] top-0 w-[57.734px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.143px] left-[29px] not-italic text-[12px] text-center text-gray-500 text-nowrap top-[5.42px] translate-x-[-50%] whitespace-pre">brand</p>
    </div>
  );
}

function Button32() {
  return (
    <div className="absolute bg-gray-50 h-[28px] left-[544.25px] rounded-[10px] top-0 w-[49.078px]" data-name="Button">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[17.143px] left-[25.5px] not-italic text-[12px] text-center text-gray-500 text-nowrap top-[5.42px] translate-x-[-50%] whitespace-pre">logo</p>
    </div>
  );
}

function Container122() {
  return (
    <div className="absolute h-[28px] left-[25px] top-[161px] w-[859.328px]" data-name="Container">
      <Icon60 />
      <Button25 />
      <Button26 />
      <Button27 />
      <Button28 />
      <Button29 />
      <Button30 />
      <Button31 />
      <Button32 />
    </div>
  );
}

function PrimitiveButton3() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[6px] h-[37px] items-center justify-center left-[3px] px-[9px] py-[5px] rounded-[14px] top-[3.5px] w-[284.438px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">All Media (10)</p>
    </div>
  );
}

function Icon61() {
  return (
    <div className="absolute left-[91.55px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p19d57600} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2fe1fe40} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p237eb400} id="Vector_3" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton4() {
  return (
    <div className="absolute h-[37px] left-[287.44px] rounded-[14px] top-[3.5px] w-[284.438px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon61 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[157.55px] not-italic text-[14px] text-center text-neutral-950 top-[8.5px] tracking-[-0.1504px] translate-x-[-50%] w-[72px]">Images (6)</p>
    </div>
  );
}

function Icon62() {
  return (
    <div className="absolute left-[92.81px] size-[16px] top-[10.5px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p2d08dd80} id="Vector" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1e94b080} id="Vector_2" stroke="var(--stroke-0, #0A0A0A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton5() {
  return (
    <div className="absolute h-[37px] left-[571.88px] rounded-[14px] top-[3.5px] w-[284.453px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Icon62 />
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[157.31px] not-italic text-[14px] text-center text-neutral-950 top-[8.5px] tracking-[-0.1504px] translate-x-[-50%] w-[69px]">Videos (4)</p>
    </div>
  );
}

function PrimitiveDiv1() {
  return (
    <div className="absolute bg-[#ececf0] h-[44px] left-[25px] rounded-[14px] top-[205px] w-[859.328px]" data-name="Primitive.div">
      <PrimitiveButton3 />
      <PrimitiveButton4 />
      <PrimitiveButton5 />
    </div>
  );
}

function Icon63() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cec7ff0} id="Vector" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p38772900} id="Vector_2" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3c195100} id="Vector_3" stroke="var(--stroke-0, #D9480F)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container123() {
  return (
    <div className="bg-[rgba(217,72,15,0.08)] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex items-center justify-center relative size-[40px]">
        <Icon63 />
      </div>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="h-[19.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[#d9480f] text-[13px] text-nowrap top-0 tracking-[-0.0762px] whitespace-pre">{`Drag & Drop to Build Timeline`}</p>
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">{`Click and hold the "DRAG" indicator on any media item, then drag it to the timeline above`}</p>
    </div>
  );
}

function Container124() {
  return (
    <div className="basis-0 grow h-[39.5px] min-h-px min-w-px relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[39.5px] items-start relative w-full">
        <Paragraph9 />
        <Paragraph10 />
      </div>
    </div>
  );
}

function Container125() {
  return (
    <div className="absolute bg-[rgba(217,72,15,0.02)] box-border content-stretch flex gap-[12px] h-[68px] items-center left-[25px] px-[14px] py-[2px] rounded-[10px] top-[273px] w-[859.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d9480f] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Container123 />
      <Container124 />
    </div>
  );
}

function Icon64() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1093e00} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p19d51e80} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p3787aee0} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon65() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text43() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container126() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon65 />
      <Text43 />
    </div>
  );
}

function Container127() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon64 />
      <Container126 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 top-0 tracking-[-0.0762px] w-[139px]">Diwali Festival Banner</p>
    </div>
  );
}

function Text44() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[31.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[31.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Image</p>
      </div>
    </div>
  );
}

function Text45() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[13.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[13.344px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[14px]">5s</p>
      </div>
    </div>
  );
}

function Container128() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text44 />
      <Text45 />
    </div>
  );
}

function Container129() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading10 />
          <Container128 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem() {
  return (
    <div className="absolute h-[192px] left-0 rounded-[14px] top-0 w-[159.063px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.063px]">
        <Container127 />
        <Container129 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon66() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p28af1900} id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p14561f00} id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon67() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text46() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container130() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon67 />
      <Text46 />
    </div>
  );
}

function Container131() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon66 />
      <Container130 />
    </div>
  );
}

function Heading11() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 text-nowrap top-0 tracking-[-0.0762px] whitespace-pre">Product Showcase</p>
    </div>
  );
}

function Text47() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[30px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Video</p>
      </div>
    </div>
  );
}

function Text48() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[18.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[18.859px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[19px]">15s</p>
      </div>
    </div>
  );
}

function Container132() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text47 />
      <Text48 />
    </div>
  );
}

function Container133() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading11 />
          <Container132 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem1() {
  return (
    <div className="absolute h-[192px] left-[175.06px] rounded-[14px] top-0 w-[159.063px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.063px]">
        <Container131 />
        <Container133 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon68() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1093e00} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p19d51e80} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p3787aee0} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon69() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text49() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container134() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon69 />
      <Text49 />
    </div>
  );
}

function Container135() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon68 />
      <Container134 />
    </div>
  );
}

function Heading12() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 text-nowrap top-0 tracking-[-0.0762px] whitespace-pre">Discount Offer 50%</p>
    </div>
  );
}

function Text50() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[31.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[31.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Image</p>
      </div>
    </div>
  );
}

function Text51() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[13.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[13.641px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[14px]">8s</p>
      </div>
    </div>
  );
}

function Container136() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text50 />
      <Text51 />
    </div>
  );
}

function Container137() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading12 />
          <Container136 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem2() {
  return (
    <div className="absolute h-[192px] left-[350.13px] rounded-[14px] top-0 w-[159.063px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.063px]">
        <Container135 />
        <Container137 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon70() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1093e00} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p19d51e80} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p3787aee0} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon71() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text52() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container138() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon71 />
      <Text52 />
    </div>
  );
}

function Container139() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon70 />
      <Container138 />
    </div>
  );
}

function Heading13() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 text-nowrap top-0 tracking-[-0.0762px] whitespace-pre">Brand Logo</p>
    </div>
  );
}

function Text53() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[31.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[31.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Image</p>
      </div>
    </div>
  );
}

function Text54() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[13.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[13.422px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[14px]">3s</p>
      </div>
    </div>
  );
}

function Container140() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text53 />
      <Text54 />
    </div>
  );
}

function Container141() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading13 />
          <Container140 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem3() {
  return (
    <div className="absolute h-[192px] left-[525.19px] rounded-[14px] top-0 w-[159.063px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.063px]">
        <Container139 />
        <Container141 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon72() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p28af1900} id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p14561f00} id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon73() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text55() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container142() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon73 />
      <Text55 />
    </div>
  );
}

function Container143() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon72 />
      <Container142 />
    </div>
  );
}

function Heading14() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 top-0 tracking-[-0.0762px] w-[138px]">Customer Testimonial</p>
    </div>
  );
}

function Text56() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[30px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Video</p>
      </div>
    </div>
  );
}

function Text57() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[20.531px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[20.531px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[21px]">20s</p>
      </div>
    </div>
  );
}

function Container144() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text56 />
      <Text57 />
    </div>
  );
}

function Container145() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading14 />
          <Container144 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem4() {
  return (
    <div className="absolute h-[192px] left-[700.25px] rounded-[14px] top-0 w-[159.078px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.078px]">
        <Container143 />
        <Container145 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon74() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1093e00} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p19d51e80} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p3787aee0} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon75() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text58() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container146() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon75 />
      <Text58 />
    </div>
  );
}

function Container147() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon74 />
      <Container146 />
    </div>
  );
}

function Heading15() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 text-nowrap top-0 tracking-[-0.0762px] whitespace-pre">Store Location</p>
    </div>
  );
}

function Text59() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[31.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[31.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Image</p>
      </div>
    </div>
  );
}

function Text60() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[13.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[13.344px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[14px]">5s</p>
      </div>
    </div>
  );
}

function Container148() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text59 />
      <Text60 />
    </div>
  );
}

function Container149() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading15 />
          <Container148 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem5() {
  return (
    <div className="absolute h-[192px] left-0 rounded-[14px] top-[208px] w-[159.063px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.063px]">
        <Container147 />
        <Container149 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon76() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p28af1900} id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p14561f00} id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon77() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text61() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container150() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon77 />
      <Text61 />
    </div>
  );
}

function Container151() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon76 />
      <Container150 />
    </div>
  );
}

function Heading16() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 top-0 tracking-[-0.0762px] w-[136px]">How It Works Tutorial</p>
    </div>
  );
}

function Text62() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[30px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Video</p>
      </div>
    </div>
  );
}

function Text63() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[20.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[20.344px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[21px]">25s</p>
      </div>
    </div>
  );
}

function Container152() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text62 />
      <Text63 />
    </div>
  );
}

function Container153() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading16 />
          <Container152 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem6() {
  return (
    <div className="absolute h-[192px] left-[175.06px] rounded-[14px] top-[208px] w-[159.063px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.063px]">
        <Container151 />
        <Container153 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon78() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1093e00} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p19d51e80} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p3787aee0} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon79() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text64() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container154() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon79 />
      <Text64 />
    </div>
  );
}

function Container155() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon78 />
      <Container154 />
    </div>
  );
}

function Heading17() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 text-nowrap top-0 tracking-[-0.0762px] whitespace-pre">Holiday Special</p>
    </div>
  );
}

function Text65() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[31.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[31.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Image</p>
      </div>
    </div>
  );
}

function Text66() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[13.563px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[13.563px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[14px]">6s</p>
      </div>
    </div>
  );
}

function Container156() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text65 />
      <Text66 />
    </div>
  );
}

function Container157() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading17 />
          <Container156 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem7() {
  return (
    <div className="absolute h-[192px] left-[350.13px] rounded-[14px] top-[208px] w-[159.063px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.063px]">
        <Container155 />
        <Container157 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon80() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p1093e00} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p19d51e80} id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p3787aee0} id="Vector_3" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon81() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text67() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container158() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon81 />
      <Text67 />
    </div>
  );
}

function Container159() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon80 />
      <Container158 />
    </div>
  );
}

function Heading18() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 text-nowrap top-0 tracking-[-0.0762px] whitespace-pre">Contact Information</p>
    </div>
  );
}

function Text68() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[31.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[31.906px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Image</p>
      </div>
    </div>
  );
}

function Text69() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[12.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[12.406px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[13px]">7s</p>
      </div>
    </div>
  );
}

function Container160() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text68 />
      <Text69 />
    </div>
  );
}

function Container161() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading18 />
          <Container160 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem8() {
  return (
    <div className="absolute h-[192px] left-[525.19px] rounded-[14px] top-[208px] w-[159.063px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.063px]">
        <Container159 />
        <Container161 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Icon82() {
  return (
    <div className="absolute left-[57.53px] size-[40px] top-[40px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Icon">
          <path d={svgPaths.p28af1900} id="Vector" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d={svgPaths.p14561f00} id="Vector_2" stroke="var(--stroke-0, #FF5900)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Icon83() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g id="Icon">
          <path d={svgPaths.p233bb300} id="Vector" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p358d1c00} id="Vector_2" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p31563d00} id="Vector_3" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p37817400} id="Vector_4" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p14c67980} id="Vector_5" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
          <path d={svgPaths.p1acad500} id="Vector_6" stroke="var(--stroke-0, #6B7280)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </svg>
    </div>
  );
}

function Text70() {
  return (
    <div className="basis-0 grow h-[13.5px] min-h-px min-w-px relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[13.5px] relative w-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[13.5px] left-0 not-italic text-[9px] text-gray-500 text-nowrap top-0 tracking-[0.167px] whitespace-pre">DRAG</p>
      </div>
    </div>
  );
}

function Container162() {
  return (
    <div className="absolute bg-white box-border content-stretch flex gap-[2px] h-[17.5px] items-center left-[8px] px-[4px] py-0 rounded-[4px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] top-[8px] w-[48.391px]" data-name="Container">
      <Icon83 />
      <Text70 />
    </div>
  );
}

function Container163() {
  return (
    <div className="h-[120px] relative shrink-0 w-full" data-name="Container">
      <Icon82 />
      <Container162 />
    </div>
  );
}

function Heading19() {
  return (
    <div className="h-[19.5px] overflow-clip relative shrink-0 w-full" data-name="Heading 4">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[19.5px] left-0 not-italic text-[13px] text-gray-900 text-nowrap top-0 tracking-[-0.0762px] whitespace-pre">Brand Story</p>
    </div>
  );
}

function Text71() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[30px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[30px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[16.5px] left-0 not-italic text-[11px] text-gray-500 text-nowrap top-0 tracking-[0.0645px] whitespace-pre">Video</p>
      </div>
    </div>
  );
}

function Text72() {
  return (
    <div className="h-[16.5px] relative shrink-0 w-[20.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[16.5px] relative w-[20.781px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16.5px] left-0 not-italic text-[#d9480f] text-[11px] top-0 tracking-[0.0645px] w-[21px]">30s</p>
      </div>
    </div>
  );
}

function Container164() {
  return (
    <div className="content-stretch flex h-[16.5px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text71 />
      <Text72 />
    </div>
  );
}

function Container165() {
  return (
    <div className="h-[68px] relative shrink-0 w-full" data-name="Container">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[8px] h-[68px] items-start pb-0 pt-[12px] px-[12px] relative w-full">
          <Heading19 />
          <Container164 />
        </div>
      </div>
    </div>
  );
}

function DraggableMediaItem9() {
  return (
    <div className="absolute h-[192px] left-[700.25px] rounded-[14px] top-[208px] w-[159.078px]" data-name="DraggableMediaItem">
      <div className="box-border content-stretch flex flex-col h-[192px] items-start overflow-clip p-[2px] relative rounded-[inherit] w-[159.078px]">
        <Container163 />
        <Container165 />
      </div>
      <div aria-hidden="true" className="absolute border-2 border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
    </div>
  );
}

function Container166() {
  return (
    <div className="absolute h-[400px] left-[25px] overflow-clip top-[357px] w-[859.328px]" data-name="Container">
      <DraggableMediaItem />
      <DraggableMediaItem1 />
      <DraggableMediaItem2 />
      <DraggableMediaItem3 />
      <DraggableMediaItem4 />
      <DraggableMediaItem5 />
      <DraggableMediaItem6 />
      <DraggableMediaItem7 />
      <DraggableMediaItem8 />
      <DraggableMediaItem9 />
    </div>
  );
}

function Badge8() {
  return (
    <div className="basis-0 bg-[rgba(22,163,74,0.08)] grow h-[24.656px] min-h-px min-w-px relative rounded-[8px] shrink-0" data-name="Badge">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[24.656px] items-center justify-center px-[9px] py-[5px] relative w-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14.667px] not-italic relative shrink-0 text-[11px] text-green-600 text-nowrap tracking-[0.0645px] whitespace-pre">6 Images</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Badge9() {
  return (
    <div className="bg-[rgba(255,89,0,0.08)] h-[24.656px] relative rounded-[8px] shrink-0 w-[65.031px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[24.656px] items-center justify-center overflow-clip px-[9px] py-[5px] relative rounded-[inherit] w-[65.031px]">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[14.667px] not-italic relative shrink-0 text-[#ff5900] text-[11px] text-nowrap tracking-[0.0645px] whitespace-pre">4 Videos</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container167() {
  return (
    <div className="h-[24.656px] relative shrink-0 w-[148.031px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[16px] h-[24.656px] items-center relative w-[148.031px]">
        <Badge8 />
        <Badge9 />
      </div>
    </div>
  );
}

function Text73() {
  return (
    <div className="h-[18px] relative shrink-0 w-[130.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[18px] relative w-[130.156px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 top-0 w-[131px]">Showing 10 of 10 items</p>
      </div>
    </div>
  );
}

function Container168() {
  return (
    <div className="absolute box-border content-stretch flex h-[41.656px] items-center justify-between left-[25px] pb-0 pt-px px-0 top-[773px] w-[859.328px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container167 />
      <Text73 />
    </div>
  );
}

function DraggableMediaLibrary() {
  return (
    <div className="bg-white h-[839.656px] relative rounded-[14px] shrink-0 w-full" data-name="DraggableMediaLibrary">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <Container119 />
      <Container121 />
      <Container122 />
      <PrimitiveDiv1 />
      <Container125 />
      <Container166 />
      <Container168 />
    </div>
  );
}

function Container169() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[2651.16px] items-start left-0 top-0 w-[909.328px]" data-name="Container">
      <Container18 />
      <PlaylistTimelineWithDnD />
      <DraggableMediaLibrary />
    </div>
  );
}

function EnhancedPlaylistEditor2() {
  return (
    <div className="h-[27px] relative shrink-0 w-full" data-name="EnhancedPlaylistEditor">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">Summary</p>
    </div>
  );
}

function Text74() {
  return (
    <div className="h-[21px] relative shrink-0 w-[41.422px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[41.422px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-gray-500 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Status</p>
      </div>
    </div>
  );
}

function Badge10() {
  return (
    <div className="bg-[rgba(22,163,74,0.08)] h-[20.656px] relative rounded-[8px] shrink-0 w-[52.25px]" data-name="Badge">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[4px] h-[20.656px] items-center justify-center overflow-clip px-[9px] py-[3px] relative rounded-[inherit] w-[52.25px]">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[14.667px] not-italic relative shrink-0 text-[11px] text-green-600 text-nowrap tracking-[0.0645px] whitespace-pre">Active</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container170() {
  return (
    <div className="box-border content-stretch flex h-[38px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Text74 />
      <Badge10 />
    </div>
  );
}

function Text75() {
  return (
    <div className="h-[21px] relative shrink-0 w-[70.656px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[70.656px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-gray-500 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Total Items</p>
      </div>
    </div>
  );
}

function Text76() {
  return (
    <div className="h-[21px] relative shrink-0 w-[8.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[8.938px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">5</p>
      </div>
    </div>
  );
}

function Container171() {
  return (
    <div className="box-border content-stretch flex h-[38px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Text75 />
      <Text76 />
    </div>
  );
}

function Text77() {
  return (
    <div className="h-[21px] relative shrink-0 w-[90.344px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[90.344px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-gray-500 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Total Duration</p>
      </div>
    </div>
  );
}

function Text78() {
  return (
    <div className="h-[21px] relative shrink-0 w-[31.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[31.688px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">0:53</p>
      </div>
    </div>
  );
}

function Container172() {
  return (
    <div className="box-border content-stretch flex h-[38px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Text77 />
      <Text78 />
    </div>
  );
}

function Text79() {
  return (
    <div className="h-[21px] relative shrink-0 w-[46.609px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[46.609px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-gray-500 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Images</p>
      </div>
    </div>
  );
}

function Text80() {
  return (
    <div className="h-[21px] relative shrink-0 w-[9.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[9.031px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">3</p>
      </div>
    </div>
  );
}

function Container173() {
  return (
    <div className="box-border content-stretch flex h-[38px] items-center justify-between pb-px pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[0px_0px_1px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Text79 />
      <Text80 />
    </div>
  );
}

function Text81() {
  return (
    <div className="h-[21px] relative shrink-0 w-[44.188px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[44.188px]">
        <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[21px] left-0 not-italic text-[14px] text-gray-500 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Videos</p>
      </div>
    </div>
  );
}

function Text82() {
  return (
    <div className="h-[21px] relative shrink-0 w-[8.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[21px] relative w-[8.672px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">2</p>
      </div>
    </div>
  );
}

function Container174() {
  return (
    <div className="content-stretch flex h-[21px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Text81 />
      <Text82 />
    </div>
  );
}

function EnhancedPlaylistEditor3() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[237px] items-start relative shrink-0 w-full" data-name="EnhancedPlaylistEditor">
      <Container170 />
      <Container171 />
      <Container172 />
      <Container173 />
      <Container174 />
    </div>
  );
}

function Container175() {
  return (
    <div className="bg-white h-[338px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[338px] items-start pb-px pt-[25px] px-[25px] relative w-full">
          <EnhancedPlaylistEditor2 />
          <EnhancedPlaylistEditor3 />
        </div>
      </div>
    </div>
  );
}

function Heading20() {
  return (
    <div className="h-[27px] relative shrink-0 w-[151.016px]" data-name="Heading 3">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-[27px] relative w-[151.016px]">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[27px] left-0 not-italic text-[18px] text-gray-900 text-nowrap top-px tracking-[-0.4395px] whitespace-pre">Playback Settings</p>
      </div>
    </div>
  );
}

function Icon84() {
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

function EnhancedPlaylistEditor4() {
  return (
    <div className="content-stretch flex h-[27px] items-center justify-between relative shrink-0 w-full" data-name="EnhancedPlaylistEditor">
      <Heading20 />
      <Icon84 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Loop Playlist</p>
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">Repeat playlist continuously</p>
    </div>
  );
}

function Container176() {
  return (
    <div className="h-[41px] relative shrink-0 w-[158.344px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[41px] items-start relative w-[158.344px]">
        <Paragraph11 />
        <Paragraph12 />
      </div>
    </div>
  );
}

function PrimitiveSpan1() {
  return (
    <div className="bg-white relative rounded-[3.35544e+07px] shrink-0 size-[16px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function PrimitiveButton6() {
  return (
    <div className="bg-[#030213] h-[18.391px] relative rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[18.391px] items-center pl-[15px] pr-px py-px relative w-[32px]">
        <PrimitiveSpan1 />
      </div>
    </div>
  );
}

function Container177() {
  return (
    <div className="content-stretch flex h-[41px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container176 />
      <PrimitiveButton6 />
    </div>
  );
}

function Paragraph13() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[21px] left-0 not-italic text-[14px] text-gray-900 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Shuffle Mode</p>
    </div>
  );
}

function Paragraph14() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-gray-500 text-nowrap top-0 whitespace-pre">Randomize playback order</p>
    </div>
  );
}

function Container178() {
  return (
    <div className="h-[41px] relative shrink-0 w-[150px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex flex-col gap-[2px] h-[41px] items-start relative w-[150px]">
        <Paragraph13 />
        <Paragraph14 />
      </div>
    </div>
  );
}

function PrimitiveSpan2() {
  return (
    <div className="bg-white relative rounded-[3.35544e+07px] shrink-0 size-[16px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border size-[16px]" />
    </div>
  );
}

function PrimitiveButton7() {
  return (
    <div className="bg-[#cbced4] h-[18.391px] relative rounded-[3.35544e+07px] shrink-0 w-[32px]" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[3.35544e+07px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex h-[18.391px] items-center p-px relative w-[32px]">
        <PrimitiveSpan2 />
      </div>
    </div>
  );
}

function Container179() {
  return (
    <div className="box-border content-stretch flex h-[58px] items-center justify-between pb-0 pt-px px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <Container178 />
      <PrimitiveButton7 />
    </div>
  );
}

function PrimitiveLabel3() {
  return (
    <div className="h-[14px] relative shrink-0 w-full" data-name="Primitive.label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[14px] left-0 not-italic text-[14px] text-neutral-950 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Transition Duration</p>
    </div>
  );
}

function PrimitiveSpan3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[88.219px]" data-name="Primitive.span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border content-stretch flex gap-[8px] h-[20px] items-center overflow-clip relative rounded-[inherit] w-[88.219px]">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-neutral-950 text-nowrap tracking-[-0.1504px] whitespace-pre">Normal (0.5s)</p>
      </div>
    </div>
  );
}

function Icon85() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #717182)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function PrimitiveButton8() {
  return (
    <div className="bg-[#f3f3f5] h-[44px] relative rounded-[8px] shrink-0 w-full" data-name="Primitive.button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="box-border content-stretch flex h-[44px] items-center justify-between px-[13px] py-px relative w-full">
          <PrimitiveSpan3 />
          <Icon85 />
        </div>
      </div>
    </div>
  );
}

function Container180() {
  return (
    <div className="box-border content-stretch flex flex-col gap-[8px] h-[83px] items-start pb-0 pt-[17px] px-0 relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1px_0px_0px] border-gray-200 border-solid inset-0 pointer-events-none" />
      <PrimitiveLabel3 />
      <PrimitiveButton8 />
    </div>
  );
}

function EnhancedPlaylistEditor5() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[214px] items-start relative shrink-0 w-full" data-name="EnhancedPlaylistEditor">
      <Container177 />
      <Container179 />
      <Container180 />
    </div>
  );
}

function Container181() {
  return (
    <div className="bg-white h-[315px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-gray-200 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[24px] h-[315px] items-start pb-px pt-[25px] px-[25px] relative w-full">
          <EnhancedPlaylistEditor4 />
          <EnhancedPlaylistEditor5 />
        </div>
      </div>
    </div>
  );
}

function Icon86() {
  return (
    <div className="absolute left-0 size-[24px] top-[2px]" data-name="Icon">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Icon">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, #16A34A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Paragraph15() {
  return (
    <div className="h-[21px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[21px] left-0 not-italic text-[14px] text-green-600 text-nowrap top-0 tracking-[-0.1504px] whitespace-pre">Ready to Publish</p>
    </div>
  );
}

function Paragraph16() {
  return (
    <div className="h-[18px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[18px] left-0 not-italic text-[12px] text-green-600 text-nowrap top-0 whitespace-pre">Your playlist is ready to be published</p>
    </div>
  );
}

function Container182() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[4px] h-[43px] items-start left-[36px] top-0 w-[207.484px]" data-name="Container">
      <Paragraph15 />
      <Paragraph16 />
    </div>
  );
}

function EnhancedPlaylistEditor6() {
  return (
    <div className="h-[43px] relative shrink-0 w-full" data-name="EnhancedPlaylistEditor">
      <Icon86 />
      <Container182 />
    </div>
  );
}

function Container183() {
  return (
    <div className="bg-[rgba(22,163,74,0.05)] h-[95px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-green-600 border-solid inset-0 pointer-events-none rounded-[14px]" />
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col h-[95px] items-start pb-[2px] pt-[26px] px-[26px] relative w-full">
          <EnhancedPlaylistEditor6 />
        </div>
      </div>
    </div>
  );
}

function Container184() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[2651.16px] items-start left-[933.33px] top-0 w-[442.656px]" data-name="Container">
      <Container175 />
      <Container181 />
      <Container183 />
    </div>
  );
}

function Container185() {
  return (
    <div className="absolute h-[2651.16px] left-[70px] top-[111px] w-[1376px]" data-name="Container">
      <Container169 />
      <Container184 />
    </div>
  );
}

function EnhancedPlaylistEditor7() {
  return (
    <div className="basis-0 bg-gray-50 grow min-h-px min-w-px relative shrink-0 w-[1516px]" data-name="EnhancedPlaylistEditor">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid box-border h-full relative w-[1516px]">
        <Container12 />
        <Container185 />
      </div>
    </div>
  );
}

function PrimitiveDiv2() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] h-[2861px] items-start relative shrink-0 w-full" data-name="Primitive.div">
      <App />
      <EnhancedPlaylistEditor7 />
    </div>
  );
}

function App1() {
  return (
    <div className="bg-gray-50 content-stretch flex flex-col h-[2938px] items-start relative shrink-0 w-full" data-name="App">
      <Container5 />
      <PrimitiveDiv2 />
    </div>
  );
}

export default function UserSignupFlowDesign() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative size-full" data-name="User Signup Flow Design">
      <App1 />
    </div>
  );
}