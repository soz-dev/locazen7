import React from "react";
import Maintenance from "@/pages/Maintenance";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: "" };
    this.handleRetry = this.handleRetry.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMsg: error?.message || String(error) };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info?.componentStack);
  }

  handleRetry() {
    this.setState({ hasError: false, errorMsg: "" });
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return <Maintenance error errorMsg={this.state.errorMsg} onRetry={this.handleRetry} />;
    }
    return this.props.children;
  }
}
