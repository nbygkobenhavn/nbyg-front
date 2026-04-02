import ImageTextButtonSection from "@/components/shared/sections/imageTextButtonSection/ImageTextButtonSection";

export default function Renovation() {
  return (
    <ImageTextButtonSection
      uniqueKey="home-page-renovation-section"
      title="Renovering af sommerhus på Bornholm"
      titlePosition="left"
      image="/images/homePage/renovation/renovationImage.jpg"
      imagePosition="left"
      buttonText="Om renovering af sommerhus"
      buttonStyle="white"
      buttonSlug="/byggeydelser/renovering-af-sommerhus"
      description={[
        {
          _key: "renovation-p1",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "renovation-p1-span",
              _type: "span",
              marks: [],
              text: "Nbyg Bornholm hjælper dig med renovering af sommerhus på Bornholm – uanset om dit hus ligger i Dueodde, Snogebæk, Gudhjem, Nexø eller Rønne. Har du brug for nyt tag, terrasse, badeværelse eller en totalrenovering, får du en lokal løsning tilpasset det bornholmske klima med fokus på holdbarhed, funktion og komfort. Vi kombinerer klassisk håndværk med moderne krav til energi og boligstandard.",
            },
          ],
        },
        {
          _key: "renovation-p2",
          _type: "block",
          style: "normal",
          markDefs: [],
          children: [
            {
              _key: "renovation-p2-span",
              _type: "span",
              marks: [],
              text: "Vi hjælper dig fra idé til færdigt resultat og gør det nemt at planlægge dit projekt – uanset om du søger pris på nyt tag på Bornholm, vil modernisere dit sommerhus eller øge boligens værdi. Hos os får du gennemsigtighed, rådgivning og en effektiv proces fra start til slut.",
            },
          ],
        },
      ]}
      _type="imageTextButtonSection"
      type="imageTextButtonSection"
    />
  );
}
