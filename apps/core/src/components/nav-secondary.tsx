import type { LucideIcon } from 'lucide-react';
import type * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@linkbcms/ui/components/sidebar';
import { IconBrightness } from '@tabler/icons-react';
import { Switch } from '@linkbcms/ui/components/switch';
import { useConfig } from '@/components/config-provider';
import { reactive } from '@legendapp/state/react';

const ReactiveSwitch = reactive(Switch);

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const config$ = useConfig();
  console.log(config$.ui.theme.defaultTheme.get());
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem className="">
            <SidebarMenuButton asChild size="sm" tooltip={'Dark Mode'}>
              <label htmlFor="dark-mode-toggle">
                <IconBrightness />
                <span className="group-data-[collapsible=icon]:hidden">
                  Dark Mode
                </span>

                <ReactiveSwitch
                  id="dark-mode-toggle"
                  className="ml-auto group-data-[collapsible=icon]:hidden"
                  $checked={() =>
                    config$.ui.theme.defaultTheme.get() !== 'light'
                  }
                  onCheckedChange={() =>
                    config$.ui.theme.defaultTheme.set((v) =>
                      v === 'light' ? 'dark' : 'light',
                    )
                  }
                />
              </label>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
