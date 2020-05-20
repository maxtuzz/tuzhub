import React from "react";
import PageTitle from "../lib/PageTitle";
import ScreenArea from "./ScreenArea";
import Words from "../lib/Words";
import HeaderText from "../lib/HeaderText";
import Markdown from "../lib/Markdown";

const HomeScreen: React.FC = () => {
    const markdownTest = `
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=maxtuzz_tuzzy-dev-portal&metric=alert_status)](https://sonarcloud.io/dashboard?id=maxtuzz_tuzzy-dev-portal)
[![Build Status](https://dev.azure.com/maxtuzzolino/maxtuzzolino/_apis/build/status/maxtuzz.tuzzy-dev-portal?branchName=master)](https://dev.azure.com/maxtuzzolino/maxtuzzolino/_build/latest?definitionId=1&branchName=master)

Tuzzy is a lightweight, cloud native developer portal being created that takes an opinionated approach to serving API documentation. 


### Building on what's good
Tuzzy uses the incredibly popular specification standard OpenAPI 3 as a bedrock for serving API documentation. This makes it trivial to plug it in and start serving your existing Swagger specs!

You can inject an existing spec directly into Tuzzy, or let Tuzzy take care of it for you if your spec is available remotely. Tuzzy will make sure the specification is kept up to date, versioned, and available to all users.

Multiple specs can be linked, and APIs can be consolidated through a centralised, easy to use interface.    

### Development
1. Install java
\`\`\`
$ brew install openjdk
\`\`\`
2. Install maven 
\`\`\`
$ brew install maven
\`\`\`
3. Install node
\`\`\`
$ brew install node
\`\`\`
4. Get backend dependencies. From \`/server\` directory:
\`\`\`
$ mvn clean install
\`\`\`
5. Get frontend dependencies. From \`/client\` directory:
\`\`\`
$ yarn install  
\`\`\`
6. Run StartPostgresDocker.kt to throw up a postgres instance for local development 
7. Run backend through editor or through cli with
\`\`\`
$ mvn clean package 
$ java -jar target/app.jar
\`\`\`
8. Run app (from client directory):
\`\`\`
$ npm start
\`\`\` 
`;
    return (
        <ScreenArea>
            <PageTitle>
                Tuzhub
            </PageTitle>
            <Markdown source={markdownTest}/>
            <Words>
                Welcome to the Tuzzy API Hub demo environment. This is a sandbox environment for the current latest
                build
                of the hub.
                Gun six pounders fire in the hole barque no prey, no pay clipper transom port barkadeer yard. Rigging
                dead
                men tell no tales long boat run a shot across the bow sutler hearties boatswain gaff snow tackle.
                Barkadeer
                Sink me cutlass run a shot across the bow piracy lad lanyard brig pink lookout.

                Me prow wench flogging mizzen gangplank six pounders Cat o'nine tails haul wind deadlights. Belay six
                pounders bilge rat lanyard tender aft mizzen draught heave to reef sails. Provost rigging mutiny
                bowsprit
                brigantine booty lass avast grog mizzenmast.

                Spirits hang the jib crow's nest Pieces of Eight gun wench Sink me measured fer yer chains ahoy scuttle.
                Avast Corsair brig ye pirate swing the lead deadlights yard furl chase. Yardarm topmast Yellow Jack prow
                fire ship scallywag hornswaggle hang the jib pink main sheet.
            </Words>

            <HeaderText>Bugs</HeaderText>
            <Words>
                Phat ipsizzle dolor dawg amizzle, we gonna chung adipiscing pot. Nullizzle sapien velizzle, away
                volutpizzle, suscipit quis, fo shizzle my nizzle vizzle, arcu. Pellentesque hizzle tortor. Dizzle
                erizzle.
                Things at dolor dapibizzle turpis tempus bling bling. Maurizzle pellentesque nibh izzle away. Izzle
                izzle
                get down get down. Phat fizzle rhoncus that's the shizzle. In boofron habitasse nizzle . Bow wow wow
                dapibizzle. Curabitur tellizzle own yo', pretizzle shizzle my nizzle crocodizzle, shizznit break it
                down,
                mah nizzle vitae, nunc. Pizzle suscipizzle. Integer gangsta break it down sizzle hizzle.
            </Words>

            <HeaderText>Changelog</HeaderText>
            <Words>
                A still more glorious dawn awaits preserve and cherish that pale blue dot the only home we've ever known
                finite but unbounded stirred by starlight network of wormholes. Gathered by gravity citizens of distant
                epochs a very small stage in a vast cosmic arena realm of the galaxies permanence of the stars the ash
                of
                stellar alchemy. Hydrogen atoms vastness is bearable only through love two ghostly white figures in
                coveralls and helmets are soflty dancing hydrogen atoms extraordinary claims require extraordinary
                evidence
                hearts of the stars and billions upon billions upon billions upon billions upon billions upon billions
                upon
                billions.
            </Words>
        </ScreenArea>
    );
};

export default HomeScreen;