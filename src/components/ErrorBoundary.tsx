import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in KAORI application:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 border border-slate-700 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-white">表示エラーが発生しました</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              ブラウザの保存データの形式更新などにより画面の描画で一時的な不整合が発生した可能性があります。
            </p>
            {this.state.error && (
              <div className="p-3 bg-slate-950/80 rounded-xl text-[11px] font-mono text-rose-300 text-left overflow-auto max-h-32 border border-slate-800">
                {this.state.error.message}
              </div>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-4 bg-gradient-to-r from-sky-500 to-teal-400 text-white font-black rounded-xl text-sm shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 hover:opacity-90 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>データを初期化して再読み込み</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
