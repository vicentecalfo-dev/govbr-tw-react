import React from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarMenuAction,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  SidebarTrigger,
  SidebarOverlay,
  SidebarInset,
  SidebarRail,
  useSidebar,
} from ".";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faChartLine,
  faFolder,
  faCog,
  faEllipsisVertical,
  faUsers,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar } from "../Avatar";
import Breadcrumb from "../Breadcrumb";
import { GovBRLogo } from "../GovBRLogo";
import { Button } from "../Button";

export default {
  title: "Sidebar",
};

const SidebarBrand: React.FC = () => {
  const { isIconCollapsed } = useSidebar();
  return (
    <div
      className={`flex w-full items-center ${isIconCollapsed ? "justify-center" : "gap-3"}`}
    >
      {/* <Avatar
        variant="initials"
        title="Design System"
        size="small"
        className="flex-shrink-0 aspect-square bg-govbr-blue-warm-vivid-70 text-govbr-pure-0"
      >
        BR
      </Avatar> */}
      <div className="size-16 flex items-center">
      <GovBRLogo />
      </div>
      {!isIconCollapsed ? (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-govbr-gray-80">Design System</span>
          <span className="text-xs text-govbr-gray-60">Portal GovBR</span>
        </div>
      ) : null}
    </div>
  );
};

const SidebarFooterUser: React.FC = () => {
  const { isIconCollapsed } = useSidebar();
  return (
    <div
      className={`flex w-full items-center ${isIconCollapsed ? "justify-center" : "gap-3"}`}
    >
      <Avatar
        variant="image"
        src="https://i.pravatar.cc/100?img=5"
        title="Ana"
        className="size-10 flex-shrink-0"
      />
      {!isIconCollapsed ? (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-govbr-gray-80">Ana Flora</span>
          <span className="text-xs text-govbr-gray-60">Coordenadora</span>
        </div>
      ) : null}
    </div>
  );
};

const OverviewSidebar = () => {
  const { theme } = useSidebar();
  const isDark = theme === "dark";
  const primaryTextClass = isDark ? "text-govbr-pure-0" : "text-govbr-gray-80";
  const subduedTextClass = isDark ? "text-govbr-blue-warm-20" : "text-govbr-gray-60";
  const cardSurfaceClass = isDark
    ? "border-govbr-blue-warm-20 bg-govbr-blue-warm-vivid-90"
    : "border-govbr-gray-20 bg-govbr-pure-0";
  const cardTitleClass = isDark ? "text-govbr-pure-0" : "text-govbr-gray-80";

  return (
    <>
      <Sidebar>
        <SidebarRail />

        <SidebarHeader className="gap-4">
          <SidebarBrand />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton icon={<FontAwesomeIcon icon={faHouse} />} isActive tooltip="Inicio">
                    Inicio
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton icon={<FontAwesomeIcon icon={faChartLine} />} tooltip="Dashboard">
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton icon={<FontAwesomeIcon icon={faUsers} />} tooltip="Equipe">
                    Equipe
                  </SidebarMenuButton>
                  <SidebarMenuAction>
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Projetos</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem collapsible defaultOpen>
                  <SidebarMenuButton icon={<FontAwesomeIcon icon={faFolder} />} tooltip="Projeto Atlas">
                    Projeto Atlas
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Visao geral</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Kanban</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Relatorios</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem collapsible>
                  <SidebarMenuButton icon={<FontAwesomeIcon icon={faFolder} />} tooltip="Projeto Orion">
                    Projeto Orion
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Planejamento</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton>Squad</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarFooterUser />
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FontAwesomeIcon icon={faCog} />} tooltip="Configuracoes">
                Configuracoes
              </SidebarMenuButton>
              <SidebarMenuAction>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </SidebarMenuAction>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton icon={<FontAwesomeIcon icon={faBell} />} tooltip="Notificacoes">
                Notificacoes
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarOverlay />
      <SidebarInset className={isDark ? "bg-govbr-blue-warm-vivid-95 text-govbr-pure-0" : undefined}>
        <div className="flex min-h-dvh flex-col">
          <header className={`flex flex-wrap items-center gap-3 px-6 pt-3 ${primaryTextClass}`}>
            <SidebarTrigger />
            <Breadcrumb className={`text-sm ${subduedTextClass}`}>
              <Button size="icon" variant={isDark ? "ghost-dark" : "ghost"}>
                <FontAwesomeIcon icon={faHouse} />
              </Button>
              <span>Painel</span>
              <span>Resumo</span>
            </Breadcrumb>
          </header>
          <main className={`flex-1 p-6 ${primaryTextClass}`}>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <article className={`rounded-lg p-4 shadow-sm ${cardSurfaceClass}`}>
                <h2 className={`text-sm font-semibold ${cardTitleClass}`}>Uso diario</h2>
                <p className={`mt-1 text-sm ${subduedTextClass}`}>
                  Ajuste o layout, a variante e os itens conforme a necessidade da sua aplicacao.
                </p>
              </article>
              <article className={`rounded-lg p-4 shadow-sm ${cardSurfaceClass}`}>
                <h2 className={`text-sm font-semibold ${cardTitleClass}`}>Colapsavel</h2>
                <p className={`mt-1 text-sm ${subduedTextClass}`}>
                  Use o trilho lateral para alternar entre largura completa e rail de icones.
                </p>
              </article>
              <article className={`rounded-lg p-4 shadow-sm ${cardSurfaceClass}`}>
                <h2 className={`text-sm font-semibold ${cardTitleClass}`}>Mobile</h2>
                <p className={`mt-1 text-sm ${subduedTextClass}`}>
                  No mobile a barra vira um painel deslizante com overlay pronto.
                </p>
              </article>
            </section>
          </main>
        </div>
      </SidebarInset>
    </>
  );
};

export const Default = () => (
  <SidebarProvider>
    <OverviewSidebar />
  </SidebarProvider>
);

export const IconRail = () => (
  <SidebarProvider collapsible="icon">
    <OverviewSidebar />
  </SidebarProvider>
);

export const WithoutRail = () => (
  <SidebarProvider collapsible="icon" showRail={false}>
    <OverviewSidebar />
  </SidebarProvider>
);

export const Floating = () => (
  <SidebarProvider variant="floating" collapsible="icon">
    <OverviewSidebar />
  </SidebarProvider>
);

export const Dark = () => (
  <SidebarProvider theme="dark" collapsible="icon">
    <OverviewSidebar />
  </SidebarProvider>
);
