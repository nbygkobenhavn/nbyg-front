import ImageTextButtonSection from "@/components/shared/sections/imageTextButtonSection/ImageTextButtonSection";

export default function ConstructionServices() {
  return (
    <ImageTextButtonSection
      uniqueKey="home-page-construction-services"
      title="Byggeydelser i 2026 – opdateret information"
      titlePosition="left"
      image="/images/homePage/aboutUs/aboutUsImage.webp"
      imagePosition="left"
      buttonText="Læs mere om vores ydelser"
      buttonStyle="white"
      buttonSlug="/byggeydelser/skreddersyede-byggetjenester"
      description={[
        {
          _key: "construction-services-p1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "construction-services-p1-span",
              _type: "span",
              marks: [],
              text: "Hos Nbyg København tilbyder vi professionelle byggeydelser i 2026, herunder terrasser, tage, badeværelser og komplette renoveringer af boliger for både private og erhverv. Vi arbejder også med renovering af sommerhuse, hvor vi fokuserer på kvalitet, funktionalitet og holdbare løsninger, der skaber værdi på lang sigt.",
            },
          ],
        },
        {
          _key: "construction-services-p2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "construction-services-p2-span",
              _type: "span",
              marks: [],
              text: "Vores team leverer gennemsigtige løsninger og et højt serviceniveau, så du altid ved, hvad du får, inden arbejdet går i gang. Vi arbejder ud fra individuelle projekter, hvor prisen afhænger af opgavens omfang og materialevalg. Mindre opgaver, såsom renovering af badeværelse, har en anden prisstruktur, mens større projekter vurderes individuelt.",
            },
          ],
        },
        {
          _key: "construction-services-p3",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "construction-services-p3-span",
              _type: "span",
              marks: [],
              text: "Priserne på vores byggeydelser starter fra 350 kr. i timen, afhængigt af opgavens kompleksitet. Vi hjælper dig med at finde den bedste løsning til dit budget og tilbyder altid en uforpligtende snak om dit projekt.",
            },
          ],
        },
      ]}
      _type="imageTextButtonSection"
      type="imageTextButtonSection"
    />
  );
}
