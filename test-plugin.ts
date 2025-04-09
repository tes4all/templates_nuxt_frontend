import { execSync } from 'node:child_process'
import path from 'node:path'

// Typdefinitionen für Serverless
interface ServerlessInstance {
  service: {
    provider: {
      stage: string
      environment: Record<string, string>
      iam?: {
        role: {
          statements: Array<{
            Effect: string
            Action: string[]
            Resource: string
          }>
        }
      }
      [key: string]: any
    }
    custom?: Record<string, any>
    layers?: Record<string, any>
    functions: Record<string, any>
    package?: Record<string, any>
    resources?: Record<string, any>
  }
  configurationInput: {
    provider: Record<string, any>
  }
}

interface ServerlessOptions {
  stage?: string
  [key: string]: any
}

async function execCommand(command: string, args: string): Promise<string> {
  return await execSync(`${command} ${args}`).toString().trim()

  const process = new Deno.Command(command, {
    args: args.split(' '),
    stdout: 'piped',
    stderr: 'piped',
  }).spawn()

  const { stdout, stderr } = await process.output()

  if (stderr) {
    const errorOutput = new TextDecoder().decode(stderr).trim()
    throw new Error(`Command failed: ${errorOutput}`)
  }
  return new TextDecoder().decode(stdout).trim()
}

class ServerlessDefault {
  static tags = ['build']

  private serverless: ServerlessInstance
  private options: ServerlessOptions
  private stage: string
  private hooks: Record<string, () => void>

  constructor(serverless: ServerlessInstance, options: ServerlessOptions) {
    this.serverless = serverless
    this.options = options
    this.stage = this.options['stage'] || this.serverless.service.provider.stage
    this.serverless.service.provider.stage = this.options['stage'] || 'dev'
    this.hooks = {
      //initialize: () => this.init(),
      //'before:package:package': () => this.beforePackage(),
      'before:package:createDeploymentArtifacts': () =>
        this.createDeploymentArtifacts(),
    }
  }

  async createDeploymentArtifacts(): Promise<void> {
    console.log('createDeploymentArtifacts')
    this.serverless.service.resources = this.serverless.service.resources || {}
    this.serverless.service.resources.Resources =
      this.serverless.service.resources.Resources || {}

    const resourcesConfig = this.serverless.service.resources || {}
    resourcesConfig.Resources = resourcesConfig.Resources || {}
    resourcesConfig.Resources.TesS3Bucket = {
      Type: 'AWS::S3::Bucket',
      Properties: {
        BucketName: `${this.serverless.service.service}-${this.stage}`,
        AccessControl: 'PublicRead',
        WebsiteConfiguration: {
          IndexDocument: 'index.html',
          ErrorDocument: 'index.html',
        },
      },
    }
    resourcesConfig.Outputs = resourcesConfig.Outputs || {}
  }

  async init(): Promise<void> {
    console.log('ServerlessDefault init', this.serverless.service)
    const customConfig = this.serverless.service.custom || {}
    this.serverless.service.resources = this.serverless.service.resources || {}
    this.serverless.service.resources.Resources =
      this.serverless.service.resources.Resources || {}

    const resourcesConfig = this.serverless.service.resources || {}
    console.log(
      'Custom Config:',
      customConfig.tes?.type,
      typeof customConfig.tes?.type,
    )
    if (customConfig.tes?.type === 'frontend') {
      console.log('Frontend detected')
    } else {
      console.log('Backend detected')
    }

    console.log('resourcesConfig', resourcesConfig)
    if (customConfig.tes?.type === 'frontend') {
      resourcesConfig.Resources = resourcesConfig.Resources || {}
      resourcesConfig.Resources.TesS3Bucket = {
        Type: 'AWS::S3::Bucket',
        Properties: {
          BucketName: `${this.serverless.service.service}-${this.stage}`,
          AccessControl: 'PublicRead',
          WebsiteConfiguration: {
            IndexDocument: 'index.html',
            ErrorDocument: 'index.html',
          },
        },
      }
      resourcesConfig.Outputs = resourcesConfig.Outputs || {}
    }
  }
}

// Deno-kompatibler Export
export default ServerlessDefault
