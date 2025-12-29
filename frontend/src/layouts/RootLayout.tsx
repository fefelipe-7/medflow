import { useState } from 'react'
import {
    LayoutDashboard,
    PackagePlus,
    PackageCheck,
    Archive,
    TriangleAlert,
    Search,
    Bell,
    Settings,
    User,
    Plus
} from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import { Input } from '@/shared/components/ui/input'
import { cn } from '@/shared/lib/utils'

interface RootLayoutProps {
    children: React.ReactNode
}

export function RootLayout({ children }: RootLayoutProps) {
    const [activeTab, setActiveTab] = useState('dashboard');

    return (
        <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r bg-card/50 backdrop-blur-sm flex flex-col">
                <div className="p-6 h-16 flex items-center border-b">
                    <div className="flex items-center gap-2 font-semibold">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                            <span className="font-bold text-lg">M</span>
                        </div>
                        <span className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent text-xl">
                            MedFlow
                        </span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    <SidebarItem
                        icon={<LayoutDashboard size={18} />}
                        label="Dashboard"
                        active={activeTab === 'dashboard'}
                        onClick={() => setActiveTab('dashboard')}
                    />
                    <div className="pt-4 pb-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Operação
                    </div>
                    <SidebarItem
                        icon={<PackagePlus size={18} />}
                        label="Pré-Registro"
                        active={activeTab === 'pre-registration'}
                        onClick={() => setActiveTab('pre-registration')}
                    />
                    <SidebarItem
                        icon={<PackageCheck size={18} />}
                        label="Recebimento"
                        active={activeTab === 'receiving'}
                        onClick={() => setActiveTab('receiving')}
                    />
                    <SidebarItem
                        icon={<Archive size={18} />}
                        label="Conferência"
                        active={activeTab === 'conference'}
                        onClick={() => setActiveTab('conference')}
                    />
                    <div className="pt-4 pb-2 px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Controle
                    </div>
                    <SidebarItem
                        icon={<TriangleAlert size={18} />}
                        label="Quarentena"
                        active={activeTab === 'quarantine'}
                        onClick={() => setActiveTab('quarantine')}
                    />
                </nav>

                <div className="p-4 border-t bg-muted/20">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                            <User size={14} className="text-primary" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">Felipe Ferreira</span>
                            <span className="text-xs text-muted-foreground">Operador Logístico</span>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 border-b flex items-center justify-between px-8 bg-card/50 backdrop-blur-sm z-10">
                    <div className="flex items-center gap-4 w-1/3">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Buscar material, nota fiscal..."
                                className="pl-9 bg-muted/50 border-muted-foreground/20 focus-visible:ring-primary/50"
                                readOnly // Placeholder reading
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                            <Bell size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                            <Settings size={18} />
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                            <Plus className="mr-2 h-4 w-4" />
                            Nova Entrada
                        </Button>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="flex-1 overflow-auto p-8 bg-background/50">
                    {children}
                </div>
            </main>
        </div>
    )
}

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
    return (
        <Button
            variant={active ? "secondary" : "ghost"}
            className={cn(
                "w-full justify-start gap-3 h-10 font-normal transition-all duration-200",
                active
                    ? "bg-primary/10 text-primary hover:bg-primary/15 border border-primary/10 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
        </Button>
    )
}
