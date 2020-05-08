/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from 'react';

import {KeycloakService} from './keycloak-service/keycloak.service';

import {PageNav} from './PageNav';
import {PageToolbar} from './PageToolbar';
import {makeRoutes} from './ContentPages';

import {
    Brand,
    Page,
    PageHeader,
    PageSection,
    PageSidebar,
} from '@patternfly/react-core';

declare function toggleReact(): void;
declare function isWelcomePage(): boolean;
declare function loggedInUserName(): string;

declare const locale: string;
declare const resourceUrl: string;

declare const brandImg: string;
declare const brandUrl: string;

export interface AppProps {};
export class App extends React.Component<AppProps> {
    private kcSvc: KeycloakService = KeycloakService.Instance;

    public constructor(props: AppProps) {
        super(props);
        toggleReact();
    }

    public render(): React.ReactNode {
        toggleReact();

        // check login
        if (!this.kcSvc.authenticated() && !isWelcomePage()) {
            this.kcSvc.login();
        }

        const username = (
            <span style={{marginLeft: '10px'}} id="loggedInUser">{loggedInUserName()}</span>
        );
        const Header = (
            <PageHeader
                logo={<a id="brandLink" href={brandUrl}><Brand src={brandImg} alt="Logo" className="brand"/></a>}
                toolbar={<PageToolbar/>}
                avatar={username}
                showNavToggle
            />
        );

        const Sidebar = <PageSidebar nav={<PageNav/>} />;

        return (
            <span style={{ height: '100%'}}>
                <Page header={Header} sidebar={Sidebar} isManagedSidebar>
                    <PageSection>
                        {makeRoutes()}
                    </PageSection>
                </Page>
            </span>
        );
    }
};