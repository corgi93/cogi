import * as ts from 'typescript'

export interface IInfo {
    filename: string
    key: string
    line: number
    column: number
}

export function getInfo(filename: string, data: string): IInfo[] {
    const sourceFile = ts.createSourceFile(
        filename,
        data, // stream to string data
        ts.ScriptTarget.Latest,
        true
    )
    return visit(sourceFile, filename)
}

export function visit(
    node: ts.Node,
    filename: string,
    ref: IInfo[] = []
): IInfo[] {
    // ts파일에서 t() 인자 값 추출
    if (node.kind === ts.SyntaxKind.CallExpression) {
        const callExpression = node as ts.CallExpression
        if (callExpression.expression.getText() === 't') {
            for (const value of callExpression.arguments) {
                if (value.kind === ts.SyntaxKind.StringLiteral) {
                    const keyValue = value.getText().replace(/'+/g, '')
                    ref.push({
                        column: 0,
                        filename,
                        key: keyValue,
                        line: 0
                    })
                }
            }
        }
    }
    // visit tsx 파일에서 t() 인자 값 추출
    if (node.kind === ts.SyntaxKind.MethodDeclaration) {
        const methodNode = node as ts.MethodDeclaration
        if (methodNode.name.getText() === 't') {
            const keyValue = methodNode
                .getText()
                .substr(3)
                .slice(0, -2)
            ref.push({
                column: 0,
                filename,
                key: keyValue,
                line: 0
            })
        }
    }
    ts.forEachChild(node, n => {
        visit(n, filename, ref)
    })

    return ref
}
